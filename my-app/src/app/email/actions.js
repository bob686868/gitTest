"use server"
import { sendEmail } from '../actions/email'


export async function sendEmailClient(formData){
    let userEmail=formData.get("email")
    await sendEmail(userEmail)
}