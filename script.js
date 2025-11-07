// Global tone state
const tones = ['Formal', 'Friendly', 'Technical'];
let currentToneIndex = 0;

// Function to cycle through tones
function cycleTone()
{
    currentToneIndex = (currentToneIndex + 1) % tones.length;
    document.getElementById('toneLabel').textContent = tones[currentToneIndex];
}

// Helper to get current tone
function getCurrentTone()
{
    return tones[currentToneIndex];
}

// Function to handle tab switching and active button state
function openTab(tabName)
{
    // 1. Hide all tab content sections
    const tabs = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabs.length; i++)
    {
        tabs[i].style.display = "none";
    }

    // 2. Show the selected tab content
    const activeTab = document.getElementById(tabName);
    if (activeTab)
    {
        activeTab.style.display = "block";
        // Auto-scroll to bottom if switching to PortfolioSummary tab
        if (tabName === 'PortfolioSummary')
        {
            const portfolioArea = document.getElementById("portfolio-area");
            portfolioArea.scrollTop = portfolioArea.scrollHeight;
        }
    }

    // 3. Update Active Navigation Button styling
    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++)
    {
        tabButtons[i].classList.remove("active");
        if (tabButtons[i].getAttribute('onclick').includes(`('${tabName}')`))
        {
            tabButtons[i].classList.add("active");
        }
    }
}

// Replace dummy output with prompt engineering
async function handleGenerate(type, userInput, tone = null)
{
    let systemPrompt = "";
    let userQuery = "";
    if (type === 'bio')
    {
        switch (tone)
        {
            case 'Formal':
                systemPrompt = "You are a highly professional corporate communications specialist. Your goal is to help the user write a biography that is polished, concise, and focused strictly on their professional achievements and core competencies. The output must be in the first person.";
                break;
            case 'Friendly':
                systemPrompt = "You are a warm, approachable copywriter. Your goal is to help the user write a biography that is engaging, conversational, and highlights their soft skills, and collaborative nature. The output must be in the first person and have an inviting tone.";
                break;
            case 'Technical':
                systemPrompt = "You are a technical writer. Your goal is to help the user write a biography that highlights the technical expertise, specific tools, and methodologies. Use precise, clear language written in the first person.";
                break;
            default:
                systemPrompt = "You are a general-purpose copywriter. Help the user write a standard, professional, but engaging biography in the first person.";
        }
        userQuery = `
Convert the following user information into a cohesive, third-person biography.

Instructions:
1. **Length:** Generate exactly two paragraphs. The first paragraph should introduce the user's current role and expertise; the second should discuss their skills/technologies and career goals.
2. **Perspective:** Write the entire bio in the first person (e.g., 'I am...', 'I specialize in...').
3. **Synthesis:** Do not use bullet points or lists. Integrate the skills and experience into a smooth, narrative flow, adhering to the specified tone: ${tone || 'Standard Professional'}.

USER INPUT:
"${userInput}"
`;
    } else if (type === 'profile')
    {
        systemPrompt = "You are an expect in personal branding, specializing in creating powerful profile headlines. Your is to help the user create a short punchy first person summary for a social media or proffessional network profile(like LinkedIn or a portfolio).";
        userQuery = `Generate a single, impactful profile headline or short summary (1-2 sentences)written in the **first person**
        Instructions:
        1. **Be concise:** No more than 2 sentences
        2. **Be impactful:** Use strong active verbs.
        3. **Perspective:** Must be **first person** ("I build...", "I am passionate about...").
        4. **Focus:** Distill the user's most important skills or passion into a proffessional identity.

        USER INPUT:
        "${userInput}"`;
    } else if (type === 'summary')
    {
        systemPrompt = "You are an expert technical editor and concise storryteller. Your task is to help the user transform technical project details into a compelling, first person summary focused on business value.";
        userQuery = `
Generate a concise, impactful, and professional Project Summary suitable for a portfolio, written from **my (the user's) perspective**.

The summary must adhere to these guidelines:
1. **Format:** Use a single, powerful paragraph (3-4 sentences max). Do not use bullet points or headings.
2. **Focus:** Clearly state the **problem I** addressed, the **solution I** developed, and the quantifiable **impact** or **outcome** of my work.
3. **Tone:** Maintain an active, results-oriented, and confident tone(e.g.,"I led...", "I implemented...").
4. **Integration:** Naturally integrate the key technologies I used and my role.

USER INPUTS to transform:
"${userInput}"
`;
    } else
    {
        throw new Error(`Invalid generation type: ${type}`);
    }
    return await callGeminiAPI(systemPrompt, userQuery);
}

// Update sendMessage to use the selected tone for all tabs
function sendMessage(tabName)
{
    let input, outputArea, userMessage;
    if (tabName === 'Bio')
    {
        input = document.getElementById("bioInput");
        outputArea = document.getElementById("bio-area");
    } else if (tabName === 'Profile')
    {
        input = document.getElementById("profileInput");
        outputArea = document.getElementById("profile-area");
    } else if (tabName === 'PortfolioSummary')
    {
        input = document.getElementById("portfolioInput");
        outputArea = document.getElementById("portfolio-area");
    }
    userMessage = input.value.trim();
    if (userMessage === "") return;
    const userBubble = document.createElement("div");
    userBubble.className = "user-bubble bubble";
    userBubble.textContent = userMessage;
    outputArea.appendChild(userBubble);
    input.value = ""; // Clear input
    outputArea.scrollTop = outputArea.scrollHeight;
    let type = tabName === 'PortfolioSummary' ? 'summary' : tabName.toLowerCase();
    handleGenerate(type, userMessage, getCurrentTone()).then(response =>
    {
        const aiBubble = document.createElement("div");
        aiBubble.className = "ai-bubble bubble";
        aiBubble.textContent = response;
        outputArea.appendChild(aiBubble);
        outputArea.scrollTop = outputArea.scrollHeight;
    });
}

// Gemini API call
async function callGeminiAPI(systemPrompt, userQuery)
{
    try
    {
        const response = await fetch('http://localhost:3001/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ systemPrompt, userQuery })
        });
        if (!response.ok)
        {
            throw new Error('Failed to generate content');
        }
        const result = await response.json();
        const candidate = result.candidates?.[0];
        if (candidate && candidate.content?.parts?.[0]?.text)
        {
            return candidate.content.parts[0].text;
        } else
        {
            throw new Error("Invalid response structure from API.");
        }
    } catch (error)
    {
        return `Error: ${error.message}`;
    }
}

// Ensure the first tab and tone label are set on page load
document.addEventListener('DOMContentLoaded', () =>
{
    openTab('Bio');
    document.getElementById('toneLabel').textContent = tones[currentToneIndex];
});