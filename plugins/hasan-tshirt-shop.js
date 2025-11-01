const { malvin } = require("../malvin");
const config = require("../settings");

// T-shirt shop data
const tshirtCatalog = {
    designs: [
        { id: 1, name: "Classic Logo", price: 25, colors: ["Black", "White", "Navy", "Red"] },
        { id: 2, name: "Vintage Print", price: 30, colors: ["Gray", "Beige", "Olive"] },
        { id: 3, name: "Modern Abstract", price: 35, colors: ["Black", "White", "Purple"] },
        { id: 4, name: "Custom Text", price: 28, colors: ["All Colors Available"] },
        { id: 5, name: "Graphic Art", price: 32, colors: ["Black", "White", "Red", "Blue"] }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    materials: ["100% Cotton", "Cotton Blend", "Premium Cotton"]
};

// Store orders temporarily (in production, use a database)
const orders = new Map();

malvin({
    pattern: "tshop",
    desc: "Hasan's T-Shirt Customization Shop - View catalog",
    category: "shop",
    react: "👕",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        let catalog = `
╭━━━━━━━━━━━━━━━━━━━━╮
│  👕 *HASAN'S T-SHIRT SHOP* 👕
╰━━━━━━━━━━━━━━━━━━━━╯

🎨 *AVAILABLE DESIGNS:*
━━━━━━━━━━━━━━━━━━━━

`;

        tshirtCatalog.designs.forEach(design => {
            catalog += `📦 *${design.id}. ${design.name}*\n`;
            catalog += `   💰 Price: $${design.price}\n`;
            catalog += `   🎨 Colors: ${design.colors.join(", ")}\n\n`;
        });

        catalog += `
📏 *AVAILABLE SIZES:*
${tshirtCatalog.sizes.join(" | ")}

🧵 *MATERIALS:*
${tshirtCatalog.materials.map((m, i) => `${i + 1}. ${m}`).join("\n")}

━━━━━━━━━━━━━━━━━━━━

📝 *HOW TO ORDER:*
Use: .torder <design_id> <size> <color>

*Example:*
.torder 1 L Black

━━━━━━━━━━━━━━━━━━━━

💡 *CUSTOM ORDERS:*
.tcustom <your design idea>

📞 *CONTACT:*
.tcontact - Get shop contact info

━━━━━━━━━━━━━━━━━━━━
> © Hasan's T-Shirt Shop
        `.trim();

        await reply(catalog);

    } catch (err) {
        console.error("Error in .tshop:", err);
        return reply(`❌ *Shop Error:* ${err.message}`);
    }
});

malvin({
    pattern: "torder",
    desc: "Place a t-shirt order",
    category: "shop",
    react: "🛒",
    filename: __filename
}, async (conn, mek, m, { reply, from, args }) => {
    try {
        if (args.length < 3) {
            return reply(`
❌ *Invalid Order Format!*

📝 *Correct Usage:*
.torder <design_id> <size> <color>

*Example:*
.torder 1 L Black

Use .tshop to view catalog
            `.trim());
        }

        const designId = parseInt(args[0]);
        const size = args[1].toUpperCase();
        const color = args.slice(2).join(" ");

        // Validate design
        const design = tshirtCatalog.designs.find(d => d.id === designId);
        if (!design) {
            return reply(`❌ Invalid design ID! Use .tshop to view available designs.`);
        }

        // Validate size
        if (!tshirtCatalog.sizes.includes(size)) {
            return reply(`❌ Invalid size! Available: ${tshirtCatalog.sizes.join(", ")}`);
        }

        // Create order
        const orderId = `ORD${Date.now()}`;
        const order = {
            id: orderId,
            customer: m.pushName || "Customer",
            phone: m.sender,
            design: design.name,
            size: size,
            color: color,
            price: design.price,
            timestamp: new Date().toISOString()
        };

        orders.set(orderId, order);

        const confirmation = `
╭━━━━━━━━━━━━━━━━━━━━╮
│  ✅ *ORDER CONFIRMED* ✅
╰━━━━━━━━━━━━━━━━━━━━╯

📋 *ORDER DETAILS:*
━━━━━━━━━━━━━━━━━━━━

🆔 Order ID: *${orderId}*
👤 Customer: *${order.customer}*
👕 Design: *${order.design}*
📏 Size: *${order.size}*
🎨 Color: *${order.color}*
💰 Price: *$${order.price}*

━━━━━━━━━━━━━━━━━━━━

📦 *NEXT STEPS:*
1. Payment confirmation required
2. Production time: 3-5 business days
3. Shipping: 2-3 business days

💳 *PAYMENT INFO:*
Use .tpayment to get payment details

📞 *QUESTIONS?*
Use .tcontact for support

━━━━━━━━━━━━━━━━━━━━
> Thank you for shopping with us! 🎉
        `.trim();

        await reply(confirmation);

    } catch (err) {
        console.error("Error in .torder:", err);
        return reply(`❌ *Order Error:* ${err.message}`);
    }
});

malvin({
    pattern: "tcustom",
    desc: "Request custom t-shirt design",
    category: "shop",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { reply, from, args }) => {
    try {
        if (args.length === 0) {
            return reply(`
❌ *Please describe your custom design!*

📝 *Usage:*
.tcustom <your design description>

*Example:*
.tcustom I want a dragon design with my name "John" in red color
            `.trim());
        }

        const customRequest = args.join(" ");
        const requestId = `CUSTOM${Date.now()}`;

        const response = `
╭━━━━━━━━━━━━━━━━━━━━╮
│  ✨ *CUSTOM REQUEST* ✨
╰━━━━━━━━━━━━━━━━━━━━╯

🆔 Request ID: *${requestId}*
👤 Customer: *${m.pushName || "Customer"}*

📝 *YOUR REQUEST:*
${customRequest}

━━━━━━━━━━━━━━━━━━━━

⏰ *PROCESSING TIME:*
• Design mockup: 24-48 hours
• You'll receive a preview
• Approval required before production

💰 *PRICING:*
• Custom designs start at $35
• Final price depends on complexity
• Quote will be provided with mockup

📞 *NEXT STEPS:*
Our design team will contact you within 24 hours with:
• Design mockup
• Final pricing
• Production timeline

Use .tcontact for immediate assistance

━━━━━━━━━━━━━━━━━━━━
> We'll bring your vision to life! 🎨
        `.trim();

        await reply(response);

    } catch (err) {
        console.error("Error in .tcustom:", err);
        return reply(`❌ *Custom Request Error:* ${err.message}`);
    }
});

malvin({
    pattern: "tpayment",
    desc: "Get payment information",
    category: "shop",
    react: "💳",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        const paymentInfo = `
╭━━━━━━━━━━━━━━━━━━━━╮
│  💳 *PAYMENT INFO* 💳
╰━━━━━━━━━━━━━━━━━━━━╯

💰 *ACCEPTED METHODS:*
━━━━━━━━━━━━━━━━━━━━

1️⃣ *Bank Transfer*
   • Bank: ABC Bank
   • Account: 1234567890
   • Name: Hasan T-Shirt Shop

2️⃣ *Mobile Money*
   • Provider: M-Pesa
   • Number: +1234567890
   • Name: Hasan Shop

3️⃣ *PayPal*
   • Email: hasan.tshop@email.com

4️⃣ *Cash on Delivery*
   • Available for local orders
   • +$5 service fee

━━━━━━━━━━━━━━━━━━━━

📝 *PAYMENT INSTRUCTIONS:*
1. Make payment using any method above
2. Send payment proof to .tcontact
3. Include your Order ID
4. Wait for confirmation

⚠️ *IMPORTANT:*
• Orders processed after payment confirmation
• Keep payment receipt for reference
• Refunds available within 24 hours

━━━━━━━━━━━━━━━━━━━━
> Secure & Fast Processing 🔒
        `.trim();

        await reply(paymentInfo);

    } catch (err) {
        console.error("Error in .tpayment:", err);
        return reply(`❌ *Payment Info Error:* ${err.message}`);
    }
});

malvin({
    pattern: "tcontact",
    desc: "Get shop contact information",
    category: "shop",
    react: "📞",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        const contactInfo = `
╭━━━━━━━━━━━━━━━━━━━━╮
│  📞 *CONTACT US* 📞
╰━━━━━━━━━━━━━━━━━━━━╯

👤 *SHOP OWNER:*
Hasan - T-Shirt Designer

━━━━━━━━━━━━━━━━━━━━

📱 *CONTACT METHODS:*

📞 Phone: +1234567890
📧 Email: hasan.tshop@email.com
💬 WhatsApp: +1234567890
🌐 Website: www.hasantshop.com

━━━━━━━━━━━━━━━━━━━━

🕐 *BUSINESS HOURS:*
Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 4:00 PM
Sunday: Closed

━━━━━━━━━━━━━━━━━━━━

📍 *LOCATION:*
123 Fashion Street
Design District
City, State 12345

━━━━━━━━━━━━━━━━━━━━

💬 *QUICK SUPPORT:*
For immediate assistance, send a message with:
• Your Order ID
• Your question/concern
• Contact preference

We typically respond within 2 hours!

━━━━━━━━━━━━━━━━━━━━
> We're here to help! 🤝
        `.trim();

        await reply(contactInfo);

    } catch (err) {
        console.error("Error in .tcontact:", err);
        return reply(`❌ *Contact Info Error:* ${err.message}`);
    }
});

malvin({
    pattern: "tmyorders",
    desc: "View your order history",
    category: "shop",
    react: "📦",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        const userOrders = Array.from(orders.values()).filter(
            order => order.phone === m.sender
        );

        if (userOrders.length === 0) {
            return reply(`
📦 *NO ORDERS FOUND*

You haven't placed any orders yet.

Use .tshop to browse our catalog!
            `.trim());
        }

        let orderList = `
╭━━━━━━━━━━━━━━━━━━━━╮
│  📦 *YOUR ORDERS* 📦
╰━━━━━━━━━━━━━━━━━━━━╯

`;

        userOrders.forEach((order, index) => {
            orderList += `
${index + 1}. *${order.design}*
   🆔 ${order.id}
   📏 Size: ${order.size}
   🎨 Color: ${order.color}
   💰 $${order.price}
   📅 ${new Date(order.timestamp).toLocaleDateString()}

`;
        });

        orderList += `
━━━━━━━━━━━━━━━━━━━━
Total Orders: ${userOrders.length}

> Thank you for your business! 🎉
        `.trim();

        await reply(orderList);

    } catch (err) {
        console.error("Error in .tmyorders:", err);
        return reply(`❌ *Order History Error:* ${err.message}`);
    }
});
