import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { recipientName, senderName, message } = await request.json()

    const whatsappText = encodeURIComponent(
      `🌸 *Dedicatoria Especial de Serené* 🌸\n\n` +
        `Para: ${recipientName} ❤️\n\n` +
        `${message}\n\n` +
        `Con cariño, ${senderName} ✨\n\n` +
        `_Un detalle de Serené Le Parfum_\n\n` +
        `🎁 Crea tu propia dedicatoria: https://serene-gift.vercel.app`,
    )

    const whatsappUrl = `https://wa.me/?text=${whatsappText}`

    return NextResponse.json({ success: true, url: whatsappUrl })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error creating WhatsApp link" }, { status: 500 })
  }
}
