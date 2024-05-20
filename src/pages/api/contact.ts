export const prerender = false

import { Resend } from 'resend'

import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend('re_E4XhCbzr_PaHCXvhqMXBFbCBsHurRydaJ')

  const data = await request.formData()
  const name = data.get('name')
  const email = data.get('email')
  const message = data.get('message')
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields'
      }),
      { status: 400 }
    )
  }

  resend.emails.send({
    from: 'aaron@dotmd.io',
    to: 'aaron@dotmd.io',
    subject: `New message from ${name}`,
    html: `<h1>New message from ${name}</h1><p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
  })
  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: 'Mensaje enviado correctamente.'
    }),
    { status: 200 }
  )
}
