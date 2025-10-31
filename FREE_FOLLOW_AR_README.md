# 📢 Free Follow Auto-Reply (AR) Feature

## Overview
This feature allows your WhatsApp bot to automatically reply to messages containing follow-related keywords. Perfect for social media growth and engagement!

## 🎯 Features
- ✅ Automatic replies to follow requests
- ✅ Customizable keywords and responses
- ✅ Easy management commands
- ✅ Pre-configured default responses
- ✅ Owner-only configuration

## 📝 How to Use

### View All Commands
```
.followar
```
This will show you all available commands and usage examples.

### Add a New Auto-Reply
```
.followar add <keyword>|<reply message>
```

**Examples:**
```
.followar add follow|Thanks for following! 🎉
.followar add f4f|Follow for follow! Let's grow together! 💪
.followar add sub|Thanks for subscribing! 🔔
```

### Remove an Auto-Reply
```
.followar remove <keyword>
```

**Example:**
```
.followar remove follow
```

### List All Auto-Replies
```
.followar list
```
This will show all configured keywords and their responses.

### Clear All Auto-Replies
```
.followar clear
```
This will remove all configured auto-replies.

## 🎨 Default Keywords

The following keywords are pre-configured:

| Keyword | Response |
|---------|----------|
| `follow` | Thanks for following! 🎉 |
| `f4f` | Follow for Follow! Let's grow together! 💪 |
| `follow back` | Following you back! ✨ |
| `followed` | Thank you so much! 🙏 |
| `following` | Thanks for following! 👋 |
| `follow me` | Sure thing! I'll follow you! 📢 |
| `followback` | Done! Followed you back! ✅ |
| `sub` | Subscribed! 🔔 |
| `subscribe` | Thank you for subscribing! ⭐ |

## 🔧 Configuration

### File Locations
- **Plugin File:** `/plugins/free-follow-ar.js`
- **Data File:** `/autos/followreply.json`

### Customization
You can manually edit the `followreply.json` file to add or modify responses:

```json
{
  "your_keyword": "Your custom response here! 🎉",
  "another_keyword": "Another response! 💖"
}
```

## 💡 Tips

1. **Use Emojis:** Make your responses more engaging with emojis! 🎉
2. **Be Friendly:** Keep your auto-replies warm and welcoming
3. **Keep it Short:** Brief messages work best for auto-replies
4. **Test First:** Try your keywords in a test chat before going live
5. **Regular Updates:** Keep your responses fresh and relevant

## 🚀 Advanced Usage

### Multiple Keywords for Same Response
You can add multiple keywords that trigger the same response:

```
.followar add follow|Thanks for following! 🎉
.followar add followed|Thanks for following! 🎉
.followar add following|Thanks for following! 🎉
```

### Keyword Matching
The bot will trigger if:
- The message exactly matches the keyword
- The message contains the keyword (case-insensitive)

Example: If keyword is "follow", these will trigger:
- "follow"
- "Follow me"
- "I will follow you"
- "FOLLOW"

## ⚠️ Important Notes

1. **Owner Only:** Only the bot owner can manage auto-replies
2. **Case Insensitive:** Keywords are not case-sensitive
3. **One Reply Per Message:** Only one auto-reply will be sent per message
4. **No Spam:** The bot won't spam multiple replies for multiple keywords

## 🛠️ Troubleshooting

### Auto-replies not working?
1. Check if the feature is enabled in settings
2. Verify the keyword is correctly added using `.followar list`
3. Make sure the message contains the exact keyword
4. Check file permissions for `followreply.json`

### Can't add new keywords?
1. Ensure you're the bot owner
2. Use the correct format: `keyword|reply`
3. Check for typos in the command

## 📞 Support

If you need help or have questions:
- Check the command help: `.followar`
- Review this README file
- Contact the bot owner

## 🎉 Examples of Great Auto-Replies

```
.followar add follow|🎉 Thanks for the follow! You're awesome! 💖
.followar add f4f|🤝 Let's grow together! Drop your handle! 👇
.followar add sub|🔔 Subscribed! Welcome to the family! 🎊
.followar add support|💪 Thanks for your support! It means everything! 🙏
.followar add dm|📩 DM me anytime! I'm here to help! 💬
```

---

**Created by:** Lucky Tech Hub  
**Version:** 1.0.0  
**Last Updated:** 2025

*Happy Growing! 🚀*
