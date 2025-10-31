const fs = require('fs');
const path = require('path');
const config = require('../settings');
const { malvin, commands } = require('../malvin');

// Free Follow Auto Reply Plugin
malvin({
  pattern: "followar",
  alias: ["freefollow", "followreply"],
  desc: "Manage free follow auto-reply messages",
  category: "owner",
  react: "📢",
  filename: __filename
},
async (conn, mek, m, { from, body, isOwner, args, reply }) => {
  if (!isOwner) return reply("❌ This command is only for the bot owner!");

  const filePath = path.join(__dirname, '../autos/followreply.json');
  
  // Initialize file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
  }

  const subCommand = args[0]?.toLowerCase();

  if (!subCommand) {
    return reply(`*📢 FREE FOLLOW AUTO-REPLY MANAGER*

*Usage:*
• ${config.PREFIX}followar add <keyword>|<reply>
• ${config.PREFIX}followar remove <keyword>
• ${config.PREFIX}followar list
• ${config.PREFIX}followar clear

*Example:*
${config.PREFIX}followar add follow|Thanks for following! 🎉
${config.PREFIX}followar add f4f|Follow for follow! Let's grow together! 💪`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  switch (subCommand) {
    case 'add':
      const addText = args.slice(1).join(' ');
      if (!addText.includes('|')) {
        return reply("❌ Please use the format: keyword|reply message");
      }
      const [keyword, replyMsg] = addText.split('|').map(s => s.trim());
      if (!keyword || !replyMsg) {
        return reply("❌ Both keyword and reply message are required!");
      }
      data[keyword.toLowerCase()] = replyMsg;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      reply(`✅ Auto-reply added successfully!

*Keyword:* ${keyword}
*Reply:* ${replyMsg}`);
      break;

    case 'remove':
    case 'delete':
      const removeKeyword = args.slice(1).join(' ').toLowerCase();
      if (!removeKeyword) {
        return reply("❌ Please provide a keyword to remove!");
      }
      if (data[removeKeyword]) {
        delete data[removeKeyword];
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        reply(`✅ Auto-reply for "${removeKeyword}" has been removed!`);
      } else {
        reply(`❌ No auto-reply found for "${removeKeyword}"`);
      }
      break;

    case 'list':
      if (Object.keys(data).length === 0) {
        return reply("📭 No follow auto-replies configured yet!");
      }
      let listMsg = "*📢 FREE FOLLOW AUTO-REPLIES*\n\n";
      for (const [key, value] of Object.entries(data)) {
        listMsg += `*Keyword:* ${key}\n*Reply:* ${value}\n\n`;
      }
      reply(listMsg);
      break;

    case 'clear':
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
      reply("✅ All follow auto-replies have been cleared!");
      break;

    default:
      reply("❌ Invalid sub-command! Use: add, remove, list, or clear");
  }
});

// Auto-reply listener for follow messages
malvin({
  on: "body"
},
async (conn, mek, m, { from, body }) => {
  const filePath = path.join(__dirname, '../autos/followreply.json');
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const lowerBody = body.toLowerCase().trim();

  // Check for exact match or if keyword is contained in message
  for (const [keyword, replyMsg] of Object.entries(data)) {
    if (lowerBody === keyword.toLowerCase() || lowerBody.includes(keyword.toLowerCase())) {
      await m.reply(replyMsg);
      break; // Only send one reply per message
    }
  }
});
