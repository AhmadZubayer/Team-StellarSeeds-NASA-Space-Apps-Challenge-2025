const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const micButton = document.getElementById('micButton');
const imageButton = document.getElementById('imageButton');

const GEMINI_API_KEY = 'AIzaSyCm_bvqxRg5dXEL3qHJ-GlD_U5FBCwneME';

let uploadedImageData = null;
let uploadedImageFileName = null;

const nasaKnowledgeBase = [
    { keyword: "flood", text: "NASA satellites (like SWOT for surface water and precipitation missions like GPM) provide crucial data for flood prediction and monitoring, tracking soil moisture, river levels, and rainfall patterns. Farmers can use this to anticipate flood risks and plan accordingly." },
    { keyword: "drought", text: "NASA's GRACE-FO mission monitors changes in Earth's gravity field, revealing changes in groundwater storage, which is critical for drought monitoring and water resource management. Satellite imagery also helps identify drought-stressed areas." },
    { keyword: "crop health", text: "Remote sensing via NASA and ESA satellites like Landsat and Sentinel can assess crop health by measuring vegetation indices like NDVI (Normalized Difference Vegetation Index), indicating plant vigor, chlorophyll content, and stress levels (e.g., from water scarcity or disease). Thermal imaging can also detect heat stress." },
    { keyword: "soil fertility", text: "While not direct real-time measurement, NASA-derived soil moisture data can infer nutrient availability and overall soil health. Understanding soil moisture helps in efficient fertilizer application. Research also uses satellite data to map soil types over large areas, informing best practices." },
    { keyword: "pest", text: "NASA research contributes to understanding climate patterns that influence pest migration and population dynamics. Satellite data on temperature and humidity can help predict conditions favorable for certain pest outbreaks, allowing farmers to take preventative measures." },
    { keyword: "weather", text: "NASA's Earth observation satellites (e.g., GOES-R series, Aqua, Terra) provide vast amounts of data for weather forecasting, including temperature, humidity, cloud cover, and precipitation, which are vital for agricultural planning." },
    { keyword: "water conservation", text: "Satellite data on evapotranspiration (water loss from plants and soil) helps farmers optimize irrigation schedules, ensuring crops get enough water without waste, directly supporting water conservation efforts. Precision agriculture relies heavily on this data." },
    { keyword: "climate change", text: "NASA's long-term climate research provides critical insights into changing weather patterns, rising temperatures, and extreme weather events impacting agriculture. This data helps farmers adapt crop choices and practices for future resilience." },
    { keyword: "irrigation", text: "NASA's SMAP mission provides global soil moisture data, which is invaluable for optimizing irrigation. Knowing how much moisture is in the soil helps farmers decide when and how much to water, improving efficiency and conserving water." },
    { keyword: "10-day weather forecast", text: "The 10-Day Weather Forecast for [LOCATION] includes: Day 1: Max Temp 33°C, Min Temp 26°C, 10mm Rainfall, 78% Humidity. Day 2: Max Temp 32°C, Min Temp 25°C, 15mm Rainfall, 82% Humidity (Light showers). Day 3: Max Temp 31°C, Min Temp 25°C, 0mm Rainfall, 75% Humidity. Day 4: Max Temp 34°C, Min Temp 26°C, 5mm Rainfall, 70% Humidity. Day 5: Max Temp 35°C, Min Temp 27°C, 0mm Rainfall, 65% Humidity (Heatwave alert). Day 6: Max Temp 33°C, Min Temp 26°C, 20mm Rainfall, 80% Humidity (Moderate rainfall). Day 7: Max Temp 32°C, Min Temp 25°C, 25mm Rainfall, 85% Humidity (Thunderstorm). Day 8: Max Temp 31°C, Min Temp 24°C, 0mm Rainfall, 70% Humidity. Day 9: Max Temp 33°C, Min Temp 26°C, 5mm Rainfall, 68% Humidity. Day 10: Max Temp 32°C, Min Temp 25°C, 0mm Rainfall, 65% Humidity." },
    { keyword: "farming actions day 1", text: "Recommended Farming Actions for Day 1: Light irrigation in the morning. Check soil moisture for young seedlings. Monitor leafy crops for early pests." },
    { keyword: "farming actions day 2", text: "Recommended Farming Actions for Day 2: Avoid heavy irrigation due to rain. Apply organic mulch to retain soil moisture. Check for fungal growth on vegetables." },
    { keyword: "farming actions day 3", text: "Recommended Farming Actions for Day 3: Irrigate if soil moisture is low. Prepare fields for fertilizer application. Harvest early-maturing crops." },
    { keyword: "farming actions day 4", text: "Recommended Farming Actions for Day 4: Fertilize main crops in the morning. Continue routine pest monitoring." },
    { keyword: "farming actions day 5", text: "Recommended Farming Actions for Day 5: Limit outdoor labor during heatwave hours. Water crops in early morning to reduce heat stress. Shade-sensitive crops if possible." },
    { keyword: "farming actions day 6", text: "Recommended Farming Actions for Day 6: Reduce irrigation due to rainfall. Ensure proper drainage to prevent waterlogging. Check for pest outbreaks after rain." },
    { keyword: "farming actions day 7", text: "Recommended Farming Actions for Day 7: Protect seedlings from heavy rainfall and wind. Secure lightweight greenhouse covers. Monitor for fungal infections." },
    { keyword: "farming actions day 8", text: "Recommended Farming Actions for Day 8: Resume irrigation if soil dries. Prepare for harvesting vegetables that thrive in dry conditions." },
    { keyword: "farming actions day 9", text: "Recommended Farming Actions for Day 9: Apply light irrigation. Begin post-rain pest management. Prune overgrown crops." },
    { keyword: "farming actions day 10", text: "Recommended Farming Actions for Day 10: Irrigate moderately in the morning. Apply preventive fertilizer for upcoming week. Monitor soil pH and moisture." },
    { keyword: "best crops leafy vegetables", text: "Best Leafy Vegetables to Cultivate: Spinach (18-30°C, moderate/moist soil, water 1-2 times/day dry, fertilize nitrogen-rich compost). Lettuce (15-25°C, high moisture/avoid waterlogging, water daily/drip, mulch to retain moisture). Kale (15-27°C, moderate/slightly moist soil, water 2-3 times/week based on rainfall, tolerates light frost, avoids prolonged drought)." },
    { keyword: "best crops root crops", text: "Best Root Crops to Cultivate: Radish (10-25°C, moderate/well-drained soil, water 2-3 times/week, avoid waterlogging, harvest quickly). Carrot (16-24°C, moderate/sandy loam, water 2-3 times/week, loosen soil for root expansion). Beetroot (18-30°C, moderate/slightly moist soil, water 2-3 times/week, organic fertilizer for good root growth)." },
    { keyword: "best crops fruit crops", text: "Best Fruit Crops to Cultivate: Tomato (20-28°C, avoid >35°C, moderate/well-drained soil, water 1-2 times/day dry, protect from heatwave on Day 5 with shading/mulching). Chili (22-30°C, moderate/avoid waterlogging, water 2-3 times/week, support with stakes, prevent pest attack). Brinjal/Eggplant (22-30°C, moderate/well-drained soil, water 2-3 times/week, protect from excessive rainfall on Day 6-7 to avoid fungal infection)." },
    { keyword: "best crops legumes", text: "Best Legume Crops to Cultivate: Cowpea (20-32°C, low to moderate soil moisture, drought tolerant, water only during dry spells, ideal for Day 6-7 rainfall, fix nitrogen naturally). Mungbean (24-35°C, moderate soil moisture, avoid waterlogging, minimal watering if rainfall is adequate, quick-growing, suitable for post-rain planting)." },
    { keyword: "best crops short-cycle leafy greens", text: "Best Optional Short-Cycle Leafy Greens: Examples include Mustard greens, Arugula, Pak Choi. Temperature: 15–28°C, high/even moist soil, water daily/drip irrigation. Harvest continuously; ideal for filling gaps between main crops." },
    { keyword: "tips for all crops", text: "General Tips for all crops: Use mulch to maintain soil moisture and reduce evaporation. Avoid irrigation during heavy rainfall days (Day 2, Day 6–7). Check soil pH: most crops prefer 6.0–7.5. Monitor pests especially after rain or heatwave." },
    { keyword: "weather day 1", text: "Day 1 weather: Max Temp 33°C, Min Temp 26°C, 10mm Rainfall, 78% Humidity." },
    { keyword: "weather day 2", text: "Day 2 weather: Max Temp 32°C, Min Temp 25°C, 15mm Rainfall, 82% Humidity, Light showers." },
    { keyword: "weather day 5", text: "Day 5 weather: Max Temp 35°C, Min Temp 27°C, 0mm Rainfall, 65% Humidity, Heatwave alert." },
    { keyword: "weather day 6", text: "Day 6 weather: Max Temp 33°C, Min Temp 26°C, 20mm Rainfall, 80% Humidity, Moderate rainfall." },
    { keyword: "weather day 7", text: "Day 7 weather: Max Temp 32°C, Min Temp 25°C, 25mm Rainfall, 85% Humidity, Thunderstorm." },
    { keyword: "heatwave alert", text: "A Heatwave alert is issued for Day 5 (Max Temp 35°C, Min Temp 27°C). Limit outdoor labor, water crops in early morning, shade sensitive crops." },
    { keyword: "thunderstorm", text: "A Thunderstorm is forecasted for Day 7 (Max Temp 32°C, Min Temp 25°C, 25mm Rainfall, 85% Humidity). Protect seedlings from heavy rainfall and wind, secure greenhouse covers, monitor for fungal infections." },
    { keyword: "light showers", text: "Light showers are expected on Day 2 (15mm rainfall, 82% humidity). Avoid heavy irrigation. Check for fungal growth." },
    { keyword: "moderate rainfall", text: "Moderate rainfall is expected on Day 6 (20mm rainfall, 80% humidity). Reduce irrigation, ensure proper drainage, check for pest outbreaks." },
    { keyword: "spinach", text: "Spinach growing conditions: Temperature 18-30°C, moderate/moist soil, water 1-2 times/day dry, fertilize with nitrogen-rich compost." },
    { keyword: "lettuce", text: "Lettuce growing conditions: Temperature 15-25°C (avoid above 30°C), high moisture, avoid waterlogging, water daily/drip, mulch to retain moisture." },
    { keyword: "kale", text: "Kale growing conditions: Temperature 15-27°C, moderate/slightly moist soil, water 2-3 times/week based on rainfall, tolerates light frost, avoids prolonged drought." },
    { keyword: "radish", text: "Radish growing conditions: Temperature 10-25°C, moderate/well-drained soil, water 2-3 times/week, avoid waterlogging, harvest quickly after maturity." },
    { keyword: "carrot", text: "Carrot growing conditions: Temperature 16-24°C, moderate/sandy loam preferred, water 2-3 times/week, loosen soil for root expansion." },
    { keyword: "beetroot", text: "Beetroot growing conditions: Temperature 18-30°C, moderate/slightly moist soil, water 2-3 times/week, apply organic fertilizer." },
    { keyword: "tomato", text: "Tomato growing conditions: Temperature 20-28°C (avoid >35°C), moderate/well-drained soil, water 1-2 times/day dry, protect from heatwave on Day 5 with shading/mulching." },
    { keyword: "chili", text: "Chili growing conditions: Temperature 22-30°C, moderate/avoid waterlogging, water 2-3 times/week, support with stakes, prevent pest attack." },
    { keyword: "brinjal", text: "Brinjal (Eggplant) growing conditions: Temperature 22-30°C, moderate/well-drained soil, water 2-3 times/week, protect from excessive rainfall on Day 6-7 to avoid fungal infection." },
    { keyword: "eggplant", text: "Brinjal (Eggplant) growing conditions: Temperature 22-30°C, moderate/well-drained soil, water 2-3 times/week, protect from excessive rainfall on Day 6-7 to avoid fungal infection." },
    { keyword: "cowpea", text: "Cowpea growing conditions: Temperature 20-32°C, low to moderate soil moisture, drought tolerant, water only during prolonged dry spells, ideal for Day 6-7 rainfall, fix nitrogen naturally." },
    { keyword: "mungbean", text: "Mungbean growing conditions: Temperature 24-35°C, moderate soil moisture, avoid waterlogging, minimal watering if rainfall is adequate, quick-growing, suitable for post-rain planting." },
    { keyword: "mustard greens", text: "Mustard greens (short-cycle leafy green) growing conditions: Temperature 15–28°C, high/even moist soil, water daily/drip irrigation." },
    { keyword: "arugula", text: "Arugula (short-cycle leafy green) growing conditions: Temperature 15–28°C, high/even moist soil, water daily/drip irrigation." },
    { keyword: "pak choi", text: "Pak Choi (short-cycle leafy green) growing conditions: Temperature 15–28°C, high/even moist soil, water daily/drip irrigation." },
    { keyword: "mulch", text: "Use mulch to maintain soil moisture and reduce evaporation. Also, avoid heavy irrigation during rainfall days (Day 2, Day 6–7) and monitor pests." },
    { keyword: "soil pH", text: "Check soil pH: most crops prefer 6.0–7.5. Also monitor soil moisture." }
];

function addMessage(text, sender = 'user') {
    const msgDiv = document.createElement('div');
    
    if (sender === 'user') {
        msgDiv.className = 'chat chat-end';
        msgDiv.innerHTML = `<div class="chat-bubble">${text}</div>`;
    } else {
        msgDiv.className = 'ai-response-container';
        const formattedText = marked.parse(text);
        msgDiv.innerHTML = `
            <div class="ai-avatar"><i class="fas fa-robot"></i></div>
            <div class="ai-text-content">${formattedText}</div>
        `;
    }

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to get relevant context from our NASA knowledge base
function getRelevantNasaContext(userMessage) {
    let context = [];
    const lowerMessage = userMessage.toLowerCase();
    
   
    for (let i = 1; i <= 10; i++) {
        if (lowerMessage.includes(`day ${i}`)) {
            // Prioritize specific farming actions for a day if asked
            if (lowerMessage.includes('farming actions') || lowerMessage.includes('what to do')) {
                const actionEntry = nasaKnowledgeBase.find(item => item.keyword === `farming actions day ${i}`);
                if (actionEntry) context.push(actionEntry.text);
            }
        
            const weatherEntry = nasaKnowledgeBase.find(item => item.keyword === `weather day ${i}`);
            if (weatherEntry) context.push(weatherEntry.text);
        }
    }

    
    if (lowerMessage.includes('10-day weather') || lowerMessage.includes('weather forecast')) {
        const entry = nasaKnowledgeBase.find(item => item.keyword === '10-day weather forecast');
        if (entry) context.push(entry.text);
    }
    
    
    if (lowerMessage.includes('farming actions') && !lowerMessage.includes('day')) {
        context.push("Here are general recommended farming actions for each day over the 10-day forecast period based on expected weather conditions.");
        for (let i = 1; i <= 10; i++) {
            const actionEntry = nasaKnowledgeBase.find(item => item.keyword === `farming actions day ${i}`);
            if (actionEntry) context.push(actionEntry.text);
        }
    }

   
    if (lowerMessage.includes('heatwave')) {
        const entry = nasaKnowledgeBase.find(item => item.keyword === 'heatwave alert');
        if (entry) context.push(entry.text);
    }
    if (lowerMessage.includes('thunderstorm')) {
        const entry = nasaKnowledgeBase.find(item => item.keyword === 'thunderstorm');
        if (entry) context.push(entry.text);
    }
    if (lowerMessage.includes('light showers')) {
        const entry = nasaKnowledgeBase.find(item => item.keyword === 'light showers');
        if (entry) context.push(entry.text);
    }
    if (lowerMessage.includes('moderate rainfall')) {
        const entry = nasaKnowledgeBase.find(item => item.keyword === 'moderate rainfall');
        if (entry) context.push(entry.text);
    }

    // Check for crops
    if (lowerMessage.includes('crops to cultivate') || lowerMessage.includes('best crops')) {
        const leafy = nasaKnowledgeBase.find(item => item.keyword === 'best crops leafy vegetables');
        if (leafy) context.push(leafy.text);
        const root = nasaKnowledgeBase.find(item => item.keyword === 'best crops root crops');
        if (root) context.push(root.text);
        const fruit = nasaKnowledgeBase.find(item => item.keyword === 'best crops fruit crops');
        if (fruit) context.push(fruit.text);
        const legumes = nasaKnowledgeBase.find(item => item.keyword === 'best crops legumes');
        if (legumes) context.push(legumes.text);
        const shortCycle = nasaKnowledgeBase.find(item => item.keyword === 'best crops short-cycle leafy greens');
        if (shortCycle) context.push(shortCycle.text);
    }

    // Check for individual crop details
    const cropKeywords = ["spinach", "lettuce", "kale", "radish", "carrot", "beetroot", "tomato", "chili", "brinjal", "eggplant", "cowpea", "mungbean", "mustard greens", "arugula", "pak choi"];
    for (const crop of cropKeywords) {
        if (lowerMessage.includes(crop)) {
            const entry = nasaKnowledgeBase.find(item => item.keyword === crop);
            if (entry) context.push(entry.text);
        }
    }

    // Check for general tips and other keywords
    const otherKeywords = ["mulch", "soil pH", "irrigation", "soil fertility", "water conservation", "pest", "climate change", "crop health", "drought", "flood"];
    for (const kw of otherKeywords) {
        if (lowerMessage.includes(kw) || lowerMessage.includes(kw + "s")) { // handles plurals
            const entry = nasaKnowledgeBase.find(item => item.keyword === kw);
            if (entry) context.push(entry.text);
        }
    }

    return Array.from(new Set(context)).join(" ").substring(0, 3000);
}

async function getGeminiResponse(userMessage, imageData = null) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
        console.error("Gemini API key is not set. Please replace 'YOUR_GEMINI_API_KEY' with your actual key.");
        return "Please set up your Gemini API key to enable AI responses.";
    }

    const nasaContext = getRelevantNasaContext(userMessage);

    let parts = [];

    parts.push({ text: `You are GeoGuardian, an expert AI assistant for smallholder farmers. Provide concise, actionable advice in markdown format.
    You prioritize information from NASA and Earth observation when relevant.
    ${nasaContext ? `Here is relevant data from your knowledge base: "${nasaContext}"` : ''}` });
    
    if (imageData) {
        parts.push({
            inlineData: {
                mimeType: 'image/jpeg',
                data: imageData
            }
        });
        parts.push({ text: `Analyze the image provided and consider the following question: "${userMessage}"` });
    } else {
        parts.push({ text: `User's question: "${userMessage}"` });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: parts }], // Use the constructed parts array
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500
                }
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            return data.candidates[0].content.parts[0].text;
        } else if (data.promptFeedback && data.promptFeedback.blockReason) {
            console.warn("Gemini API blocked response:", data.promptFeedback.blockReason);
            return "I'm sorry, I cannot answer that question as it might violate content policies. Please try rephrasing.";
        }
        console.error("Unexpected Gemini API response structure:", data);
        return "I'm sorry, I couldn't get a clear answer. Please try again.";

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm sorry, I'm having trouble connecting right now. Please check your network or API key.";
    }
}

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;

if (speechRecognition) {
    recognition = new speechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
        isListening = true;
        micButton.classList.add('btn-success');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        handleSendMessage(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        stopListening();
    };

    recognition.onend = () => {
        stopListening();
    };

    micButton.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });
} else {
    micButton.style.display = 'none'; 
}

function stopListening() {
    isListening = false;
    micButton.classList.remove('btn-success');
}

async function handleSendMessage(userText) {
    if (!userText && !uploadedImageData) return;

    addMessage(userText, 'user');
    chatInput.value = '';
    hideSuggestions();

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'ai-response-container';
    typingIndicator.innerHTML = `
        <div class="ai-avatar"><i class="fas fa-robot"></i></div>
        <div class="ai-text-content"><span class="loading loading-dots loading-sm"></span></div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const aiResponse = await getGeminiResponse(userText, uploadedImageData);
    
    chatMessages.removeChild(typingIndicator);
    addMessage(aiResponse, 'bot');

    // Clear uploaded image data after sending it to Gemini
    uploadedImageData = null;
    uploadedImageFileName = null;
}

chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const userText = chatInput.value.trim();
    handleSendMessage(userText);
});

async function handleSuggestionClick(question) {
    handleSendMessage(question);
}

function hideSuggestions() {
    const suggestions = document.getElementById('suggestions');
    if (suggestions) {
        suggestions.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            handleSuggestionClick(question);
        });
    });

    if (imageButton) {
        imageButton.addEventListener('click', function() {
            handleImageUpload();
        });
    }

    setTimeout(() => {
        addMessage("Hello! I'm GeoGuardian. How can I assist with your farming needs today?", 'bot');
    }, 500);
});

function handleImageUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                uploadedImageData = imageUrl.split(',')[1];
                uploadedImageFileName = file.name;

                displayImageMessage(imageUrl, file.name);
                
                setTimeout(() => {
                    addMessage(`I've received your image titled **"${uploadedImageFileName}"**. What would you like to know or do with it?`, 'bot');
                }, 1000);
            };
            reader.readAsDataURL(file);
        }
        document.body.removeChild(fileInput);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
}

function displayImageMessage(imageUrl, fileName) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat chat-end';
    msgDiv.innerHTML = `
        <div class="chat-bubble bg-green-500 text-white" style="border-radius:16px;padding:10px;max-width:80%;">
            <div class="mb-2 text-sm">📸 ${fileName}</div>
            <img src="${imageUrl}" alt="Uploaded image" style="max-width: 200px; max-height: 200px; border-radius: 8px; object-fit: cover;">
        </div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    setTimeout(() => {
        addMessage("I can see your image! Currently, I can provide general farming advice based on text descriptions. Please describe what you'd like to know about the image, and I'll help you accordingly.", 'bot');
    }, 1000);
}
