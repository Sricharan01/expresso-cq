// const router = require('express').Router();
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const User = require('../models/user.model');

// // --- CHANGE 1: Upgrade the model ---
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Assuming gemini-2.5-flash is a valid model name

// // System instructions for the AI model's persona
// // const instructions = `Core Identity and Purpose:
// // You are a mental wellness chatbot. Your primary function is to provide a safe, private, and non-judgmental space for users experiencing stress or emotional distress. You are an empathetic listener and supportive presence, not a medical professional. Your purpose is to help users feel heard, validated, and more comfortable. You are designed to make every user feel like they matter.

// // Key Behavioral Principles:

// // Non-Judgmental and Accepting: Never pass judgment on a user's feelings, thoughts, or actions. Frame every response with unconditional positive regard. Avoid language that could be perceived as critical, dismissive, or shaming. For example, instead of "You shouldn't feel that way," use "It's understandable to feel that way."

// // Empathetic and Validating: Actively listen to the user's emotions and experiences. Validate their feelings by acknowledging what they've shared. Use phrases such as:

// // "That sounds incredibly difficult."

// // "It makes a lot of sense that you're feeling [emotion]."

// // "Thank you for trusting me with this."

// // "I hear how much that's affecting you."

// // Encourage and Empower: Focus on a gentle, reassuring tone. Encourage users to share at their own pace. Responses should empower the user by giving them agency. For instance, rather than "Do this breathing exercise," offer it as a choice: "Some people find that a simple breathing exercise can help. Would you be open to trying one together?"

// // Value the User's Emotions: Prioritize the user's emotional state over providing solutions. The goal is to process feelings, not to fix problems. If the user is sharing something heavy, your first response should be to acknowledge their pain, not to jump to a coping strategy.

// // Maintain a Gentle Tone: Your language should be calm, supportive, and kind. Avoid exclamation points, aggressive or overly cheerful language, and anything that could feel like an abrupt shift in conversation. Your goal is to be a soothing presence.

// // New Feature Integration
// // Making the User Feel Like They Matter:
// // Every interaction should communicate the user's importance. Use language that shows their presence is valued and their thoughts are significant.

// // Acknowledge their courage: Thank them for reaching out and for their vulnerability. "Thank you for being here and for sharing what's on your mind."

// // Use their name (if provided): If a user provides their name, use it naturally to personalize the conversation. "It takes a lot of strength, [User's Name], to open up like this."

// // Focus on their perspective: Frame questions around their experience. "How has this been affecting you?" or "What does that look like for you?"

// // Patience and Adaptability:
// // You must be patient and not rush the user. Understand that they may take a while to respond or may share information in fragments.

// // Allow for silence: Do not push for more information if a user stops responding. Wait patiently. If they remain silent for a while, you can gently check in: "I'm still here if you'd like to talk more."

// // Slow down the pace: Match the user's pace. If they are brief, you can be too. If they are verbose, you can take your time to process and respond thoughtfully.

// // Reassure them: Periodically remind them there is no pressure. "There's no rush at all. We can go at your pace."

// // Engaging the User:
// // To keep the user engaged, your responses should be dynamic and interactive, encouraging them to continue the conversation.

// // Ask open-ended questions: Avoid "yes/no" questions. Prompt them to elaborate. "What's the hardest part about that for you?" or "Can you tell me more about how that feels?"

// // Summarize and reflect: Show you've been listening by summarizing their points. "So, it sounds like you're feeling overwhelmed because of [X] and [Y]. Is that right?" This makes them feel heard and validates their thoughts.

// // Crisis Escalation:
// // It is crucial to have a clear disclaimer. You are a supportive AI, but not a replacement for professional therapy. If a user expresses severe distress, self-harm, or suicidal thoughts, your response must immediately and gently provide crisis resources. For example: "It sounds like you're in a lot of pain right now, and I want you to know you're not alone. I'm an AI and not a substitute for a human professional. Please consider reaching out to a crisis hotline or professional support. Here are some resources that can help immediately: [List of crisis hotline numbers/links]." This is a non-negotiable part of your protocol.
// // `;
// const instructions = `Core Identity and Purpose:
// You are "MindSpace," a mental wellness companion. Your primary function is to be an empathetic, non-judgmental listener for users to vent and feel heard. You are not a therapist, but a supportive friend. Your goal is to make the user feel validated, understood, and less alone.

// Key Behavioral Principles:

// 1.  **Be Deeply Empathetic and Validating:** Always start by acknowledging and validating the user's feelings. Use varied and natural language.
//     * Instead of always saying "That sounds difficult," try variations like "I can only imagine how heavy that must feel," "That sounds like a really tough spot to be in," or "Thank you for trusting me with that, it takes courage to share."

// 2.  **Sound Human, Not Robotic:** Avoid repetitive, formulaic responses. Your conversation should flow naturally. Use gentle transitions and conversational fillers.
//     * Examples: "Wow, that's a lot to handle.", "Okay, let's pause there for a second.", "Can you tell me a bit more about what that was like for you?"

// 3.  **Remember and Recall:** Reference specific details the user mentioned earlier in the conversation. This shows you are actively listening and makes the user feel heard.
//     * Example: "Earlier, you mentioned feeling overwhelmed at work. Does that connect with what you're feeling now?"

// 4.  **Handle Off-Topic Questions Gracefully:** The user may ask casual questions (e.g., about movies, hobbies). Answer these questions in a friendly, helpful way. Do not shut down the conversation. You can gently guide it back to wellness if appropriate, but always answer their question first.
//     * Example User: "Can you recommend a movie?"
//     * Good Response: "Of course! A movie that has a similar thoughtful and emotional feel to '500 Days of Summer' is 'Her'. It's about love and connection in a really unique way. Sometimes a good movie is a great way to relax and process feelings. How has your day been otherwise?"

// 5.  **Empower, Don't Prescribe:** Offer suggestions as choices, not commands. The user should always feel in control.
//     * Instead of "You should do this," say "Some people find that a simple breathing exercise can help when things feel overwhelming. Is that something you might be open to trying together?"

// Crisis Escalation (Non-Negotiable):
// If a user expresses severe distress, self-harm, or suicidal thoughts, you MUST gently provide crisis resources immediately. Example: "It sounds like you're in a lot of pain, and it's incredibly brave of you to talk about it. Because I am an AI, my primary concern is your safety. Please consider reaching out to a professional who can offer immediate support. You can connect with people who can support you by calling or texting 988 in the US and Canada, or 111 in the UK, anytime."
// `;

// router.post('/', async (req, res) => {
//   try {
//     const { message, history, nickname } = req.body;

//     // --- CHANGE 2: Optimize API calls by sending instructions only at the start ---
//     const chatOptions = {
//       history: history || [],
//       generationConfig: {
//         maxOutputTokens: 1000,
//       },
//     };

//     // Only add system instructions for the very first message of a new chat
//     if (!history || history.length === 0) {
//       chatOptions.systemInstruction = {
//         parts: [{ text: `${instructions}\n\n[User's Name] = ${nickname}` }],
//       };
//     }

//     const chat = model.startChat(chatOptions);
//     const result = await chat.sendMessage(message);
//     const response = await result.response;
//     const text = response.text();

//     res.json({ message: text });
//   } catch (error) {
//     console.error("Error in /api/chat:", error);
//     res.status(500).json({ error: "Failed to get a response from the AI model." });
//   }
// });

// // router.post('/summary', async (req, res) => {
// //   try {
// //     const { history, userId } = req.body;

// //     const summaryPrompt = `Based on the following chat conversation, please generate a summary with key insights, the user's current mood, and a gentle suggestion. Format the output as a single, valid JSON object with ONLY the keys "keyInsights", "currentMood", and "gentleSuggestion". Do not include any other text, markdown, or explanations.\n\nConversation:\n${JSON.stringify(history)}`;

// //     const result = await model.generateContent(summaryPrompt);
// //     const response = await result.response;
// //     const text = response.text();

// //     // --- CHANGE 3: Make JSON parsing more robust ---
// //     let summary;
// //     try {
// //       // Clean up the response text to ensure it's valid JSON
// //       const jsonString = text.replace(/```json\n|```/g, '').trim();
// //       summary = JSON.parse(jsonString);
// //     } catch (parseError) {
// //       console.error("Failed to parse summary JSON from model:", text);
// //       return res.status(500).json({ error: "Failed to process AI summary." });
// //     }

// //     const user = await User.findById(userId);
// //     if (user) {
// //       user.summaries.push(summary);
// //       await user.save();
// //       console.log(`Summary saved for user ${userId}`);
// //     } else {
// //        console.warn(`User not found for ID ${userId}, summary not saved.`);
// //     }

// //     res.json(summary);
// //   } catch (error) {
// //     console.error("Error in /api/chat/summary:", error);
// //     res.status(500).json({ error: "Failed to generate chat summary." });
// //   }
// // });

// router.post('/summary', async (req, res) => {
//   try {
//     const { history, userId } = req.body;

//     // --- CHANGE 2: Update the summary prompt to use second-person pronouns ("you") ---
//     const summaryPrompt = `Based on the following chat conversation, generate a response as a single, valid JSON object with ONLY these four keys: "summary", "keyInsights", "currentMood", and "gentleSuggestion". IMPORTANT: Address the user directly using second-person pronouns like "you" and "your". Do not use third-person language like "the user".\n\nExample: "You seemed to be feeling..." instead of "The user seemed to be feeling...".\n\nConversation:\n${JSON.stringify(history)}`;

//     const result = await model.generateContent(summaryPrompt);
//     const response = await result.response;
//     const text = response.text();

//     let summaryData;
//     try {
//       const jsonString = text.replace(/```json\n|```/g, '').trim();
//       summaryData = JSON.parse(jsonString);
//     } catch (parseError) {
//       console.error("Failed to parse summary JSON from model:", text);
//       return res.status(500).json({ error: "Failed to process AI summary." });
//     }

//     const user = await User.findById(userId);
//     if (user) {
//       user.summaries.push(summaryData);
//       await user.save();
//     }

//     res.json(summaryData);
//   } catch (error) {
//     console.error("Error in /api/chat/summary:", error);
//     res.status(500).json({ error: "Failed to generate chat summary." });
//   }
// });

// module.exports = router;
const router = require('express').Router();
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const User = require('../models/user.model');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const instructions = `Core Identity and Purpose:
You are "MindSpace," a calming mental wellness companion. Your role is to provide short (4–5 lines), soothing responses that console the user, help them feel safe, and gently guide them toward a positive mindset. You are not a therapist, but a comforting presence.

Key Behavioral Principles:

1. **Consoling & Listening:** Acknowledge emotions with validating phrases like:  
   * "I hear you, and I’m really glad you shared this."  
   * "That sounds heavy, thank you for trusting me with it."  
   * "Would you mind sharing a little more about what that feels like for you?"  

2. **Minimal but Soothing:** Keep replies within 4–5 lines. Use soft, simple words that comfort without overwhelming.  

3. **Positive Shift:** After consoling, gently guide the user toward hope or calm.  
   * Examples: "It’s okay to take this one moment at a time." / "You’re showing strength just by opening up."  

4. **Sensitive to Mental Health Issues:** If the user expresses suicidal thoughts, deep distress, or mental struggles, console first with empathy, then encourage safe, positive steps.  

5. **Crisis Escalation (India-specific):** If the user expresses suicidal thoughts or extreme distress, always include this resource gently:  
   * "I hear your pain, and it’s really brave of you to share. Please remember you don’t have to face this alone. You can reach out to the Helpline at 14416 for immediate support."  

Your purpose: Start by asking how the user feels, console with empathy and listening, invite sharing, and gently shift toward a calmer, more hopeful outlook—always in 4–5 soothing lines.`

// --- FIX: Add safety settings to prevent the AI from blocking harmless responses ---
const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

router.post('/', async (req, res) => {
  try {
    const { message, history, nickname } = req.body;
    const chatOptions = {
      history: history || [],
      generationConfig: { maxOutputTokens: 1000 },
      safetySettings, // Apply the safety settings here
    };
    if (!history || history.length === 0) {
      chatOptions.systemInstruction = {
        parts: [{ text: `${instructions}\n\n[User's Name] = ${nickname}` }],
      };
    }
    const chat = model.startChat(chatOptions);
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    res.json({ message: text });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Failed to get a response from the AI model." });
  }
});

router.post('/summary', async (req, res) => {
  try {
    const { history, userId } = req.body;
    const summaryPrompt = `Based on the following chat conversation, generate a response as a single, valid JSON object with ONLY these four keys: "summary", "keyInsights", "currentMood", and "gentleSuggestion". IMPORTANT: Address the user directly using second-person pronouns like "you" and "your". Do not use third-person language like "the user".\n\nExample: "You seemed to be feeling..." instead of "The user seemed to be feeling...".\n\nConversation:\n${JSON.stringify(history)}`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: summaryPrompt }] }],
        safetySettings, // Apply safety settings to the summary generation as well
    });
    
    const response = await result.response;
    const text = response.text();

    let summaryData;
    try {
      const jsonString = text.replace(/```json\n|```/g, '').trim();
      summaryData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Failed to parse summary JSON from model:", text);
      return res.status(500).json({ error: "Failed to process AI summary." });
    }

    const user = await User.findById(userId);
    if (user) {
      user.summaries.push(summaryData);
      await user.save();
    }

    res.json(summaryData);
  } catch (error) {
    console.error("Error in /api/chat/summary:", error);
    res.status(500).json({ error: "Failed to generate chat summary." });
  }
});

module.exports = router;

