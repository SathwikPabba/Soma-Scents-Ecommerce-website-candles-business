"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { CartItem } from "@/public/data"

interface CheckoutFormProps {
  cart: CartItem[]
  onClose: () => void
  onClearCart: () => void
}

export default function CheckoutForm({ cart, onClose, onClearCart }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Format cart items for the message
      const cartItemsText = cart
        .map((item) => `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`)
        .join("\n")

      // Create admin notification message
      const adminMessage = `
*New Order Received!*

*Customer Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}

*Order Details:*
${cartItemsText}

*Total Amount:* ₹${totalPrice}
      `.trim()

      // Send WhatsApp notification to admin using API
      await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientType: 'admin',
          message: adminMessage
        }),
      })
      
      // Send confirmation message to user if they provided a phone number
      if (formData.phone) {
        const userMessage = `
*Thank you for your order with Soma Scents!*

Dear ${formData.name},

We're delighted to confirm that we've received your order. Your purchase is important to us, and we're already preparing it with care.

*Your Order Details:*
${cartItemsText}

*Total Amount:* ₹${totalPrice}

We'll be in touch shortly to confirm payment details and shipping information. If you have any questions, please don't hesitate to contact us.

Thank you for choosing Soma Scents for your home fragrance needs!
        `.trim()
        
        // Send confirmation to customer via API
        await fetch('/api/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipientType: 'customer',
            phoneNumber: formData.phone,
            message: userMessage
          }),
        })
      }

      // Email notification implementation
      // You can also implement email notifications using the same pattern:
      // 1. Create a new API route in app/api/send-email/route.ts
      // 2. Use a library like nodemailer or a service SDK (SendGrid, Mailchimp, AWS SES)
      // 3. Call the API from here using fetch
      //
      // Example:
      // await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     to: formData.email,
      //     subject: 'Your Soma Scents Order Confirmation',
      //     text: userMessage,
      //   }),
      // })
      //
      // For now, we're using WhatsApp as the primary notification method

      // Show success message and reset
      setIsSuccess(true)
      setTimeout(() => {
        onClearCart()
        onClose()
      }, 3000)
    } catch (error) {
      console.error("Error processing order:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You for Your Order!</h3>
        <p className="text-gray-600 mb-4">
          We're delighted to confirm that we've received your order for:
        </p>
        <div className="bg-gray-50 p-4 rounded-md mb-4 text-left">
          {cart.map((item, index) => (
            <div key={index} className="mb-2">
              <span className="font-medium">{item.name}</span> x {item.quantity} - ₹{item.price * item.quantity}
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <span className="font-semibold">Total Amount:</span> ₹{totalPrice}
          </div>
        </div>
        <p className="text-gray-600 mb-6">
          We'll contact you soon via WhatsApp or email to process the payment and confirm your order. Thank you for choosing Soma Scents!
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 overflow-y-auto max-h-[70vh]">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Checkout</h3>
      <p className="text-gray-600 mb-6">
        Please fill in your details below. We'll contact you to confirm your order and process the payment.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address *
          </label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter your full delivery address"
            rows={3}
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Total Amount:</span>
            <span className="text-orange-600">₹{totalPrice}</span>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              "Place Order"
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full mt-3 bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}