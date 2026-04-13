import amqp from 'amqplib'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

const RABBITMQ_PORT = Number(process.env.RABBITMQ_PORT) || 5672;

export const startConnection = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST,
            port: RABBITMQ_PORT,
            username: process.env.RABBITMQ_USER,
            password: process.env.RABBITMQ_PASSWORD,
        });

        const channel = await connection.createChannel();
        const queueName = "send-otp";
        await channel.assertQueue(queueName,{durable:true});

        console.log("Mail services consumer connected and waiting for OTP");
        channel.consume(queueName,async(msg)=>{
            if(msg){
                try{
                    const {to,subject,body} = JSON.parse(msg.content.toString());

                    const transporter = nodemailer.createTransport({
                        host:"smtp.gmail.com",
                        port:465,
                        auth:{
                            user:process.env.EMAIL_USER,
                            pass:process.env.EMAIL_PASSWORD,
                        }
                    });

                    await transporter.sendMail({
                        from:"Chat App",
                        to,
                        subject,
                        text:body,
                    });

                    console.log("OTP sent successfully",to);
                    channel.ack(msg);
                    
                }catch(error){
                    console.log("Failed to process OTP request",error);
                }
            }
        })
    } catch (error) {
        console.log("Failed to start RabbitMQ", error)
    }
}