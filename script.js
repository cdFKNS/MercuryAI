// Function to handle tab switching and active button state
function openTab(tabName)
{
    // 1. Hide all tab content sections
    const tabs = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabs.length; i++)
    {
        // Use standard CSS display property to hide the content
        tabs[i].style.display = "none";
    }

    // 2. Show the selected tab content
    const activeTab = document.getElementById(tabName);
    if (activeTab)
    {
        // Use standard CSS display property to show the content
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
        // Remove 'active' class (defined in style.css) from all buttons
        tabButtons[i].classList.remove("active");

        // Check which button corresponds to the clicked tabName
        if (tabButtons[i].getAttribute('onclick').includes(`('${tabName}')`))
        {
            // Apply 'active' class to the correct button
            tabButtons[i].classList.add("active");
        }
    }
}

// Function to handle sending input and generating dummy output based on tab
function sendMessage(tabName)
{
    let input, outputArea, userMessage, dummyResponse;

    // Get elements based on tab
    if (tabName === 'Bio')
    {
        input = document.getElementById("bioInput");
        outputArea = document.getElementById("bio-area");
        dummyResponse = "Here's a generated bio based on your input: " + input.value;
    } else if (tabName === 'Profile')
    {
        input = document.getElementById("profileInput");
        outputArea = document.getElementById("profile-area");
        dummyResponse = "Updated profile: " + input.value;
    } else if (tabName === 'PortfolioSummary')
    {
        input = document.getElementById("portfolioInput");
        outputArea = document.getElementById("portfolio-area");
        dummyResponse = "Portfolio summary: " + input.value;
    }

    userMessage = input.value.trim();
    if (userMessage === "") return;

    // Append user input as a bubble or text
    const userBubble = document.createElement("div");
    userBubble.className = "user-bubble bubble";
    userBubble.textContent = userMessage;
    outputArea.appendChild(userBubble);

    input.value = ""; // Clear input

    // Scroll to bottom
    outputArea.scrollTop = outputArea.scrollHeight;

    // Generate dummy AI response after delay
    setTimeout(() =>
    {
        const aiBubble = document.createElement("div");
        aiBubble.className = "ai-bubble bubble";
        aiBubble.textContent = dummyResponse;
        outputArea.appendChild(aiBubble);

        // Scroll to bottom after response
        outputArea.scrollTop = outputArea.scrollHeight;
    }, 500);
}

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
                systemPrompt = "You are a highly professional corporate communications specialist. Your goal is to write a biography that is polished, concise, and focused strictly on professional achievements, quantifiable results, and core competencies. Maintain a serious, authoritative, and achievement-oriented tone. The output must be ready for a company website or LinkedIn 'About' section.";
                break;
            case 'Friendly':
                systemPrompt = "You are a warm, approachable copywriter. Your goal is to write a biography that is engaging, conversational, and highlights soft skills, collaborative nature, and enthusiasm. Use an inviting tone, suitable for a personal blog or a team introduction page.";
                break;
            case 'Technical':
                systemPrompt = "You are a technical writer specializing in engineering and software. Your goal is to write a biography that highlights technical expertise, specific tools, and methodologies. Use precise, clear language suitable for a technical portfolio or engineering team page.";
                break;
            default:
                systemPrompt = "You are a general-purpose copywriter. Write a standard, professional, but engaging biography.";
        }

        userQuery = `
        Convert the following user information into a cohesive, third-person biography.

        Instructions:
        1. **Length:** Generate exactly two paragraphs. The first paragraph should introduce the user's current role and expertise; the second should discuss their skills/technologies and career goals.
        2. **Perspective:** Write the entire bio in the third person (e.g., 'She is...', 'He specializes in...').
        3. **Synthesis:** Do not use bullet points or lists. Integrate the skills and experience into a smooth, narrative flow, adhering to the specified tone: ${tone || 'Standard Professional'}.

        USER INPUT:
        "${userInput}"
        `;
    } else if (type === 'profile')
    {
        // You can add prompt engineering for Profile here if needed
        systemPrompt = "You are a professional profile generator.";
        userQuery = `Generate a profile based on: "${userInput}"`;
    } else if (type === 'summary')
    {
        systemPrompt = "You are an expert technical editor and concise storyteller. Your task is to transform technical project details into a compelling, non-technical project summary focused on business value.";
        userQuery = `
        Generate a concise, impactful, and professional Project Summary suitable for a portfolio.

        The summary must adhere to these guidelines:
        1. **Format:** Use a single, powerful paragraph (3-4 sentences max). Do not use bullet points or headings.
        2. **Focus:** Clearly state the **problem** addressed, the **solution** developed, and the quantifiable **impact** or **outcome**.
        3. **Tone:** Maintain an active, results-oriented, and confident tone.
        4. **Integration:** Naturally integrate the key technologies and the user's role.

        USER INPUTS to transform:
        "${userInput}"
        `;
    } else
    {
        throw new Error(`Invalid generation type: ${type}`);
    }

    // Placeholder for API call - replace with actual call
    return `[SYSTEM PROMPT]\n${systemPrompt}\n\n[USER QUERY]\n${userQuery}`;
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

    // Append user input as a bubble
    const userBubble = document.createElement("div");
    userBubble.className = "user-bubble bubble";
    userBubble.textContent = userMessage;
    outputArea.appendChild(userBubble);

    input.value = ""; // Clear input
    outputArea.scrollTop = outputArea.scrollHeight;

    // Generate AI response using prompt engineering
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

// LocalStorage utility functions
const STORAGE_KEY = 'aiPortfolioAssistantData';

// Save an output to localStorage
function saveOutput(content, type)
{
    const items = loadSavedOutputs();
    const newItem = {
        id: Date.now(), // Unique ID
        content,
        type
    };
    items.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Load all saved outputs from localStorage
function loadSavedOutputs()
{
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Delete a specific output by id from localStorage
function deleteSavedOutput(id)
{
    let items = loadSavedOutputs();
    items = items.filter(item => item.id != id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Clear all user data from localStorage
function clearAllUserData()
{
    localStorage.removeItem(STORAGE_KEY);
}

// Show the modal with saved items
function showSavedItems()
{
    const modal = document.getElementById('saved-items-modal');
    const list = document.getElementById('saved-items-list');
    const items = loadSavedOutputs();
    if (!items.length)
    {
        list.innerHTML = "<em>No saved outputs.</em>";
    } else
    {
        list.innerHTML = items
            .slice() // copy array
            .reverse() // newest first
            .map(item => `
                <div style="border-bottom:1px solid #eee; margin-bottom:8px; padding-bottom:8px;">
                    <strong>${item.type}</strong> <small>${new Date(item.id).toLocaleString()}</small>
                    <pre style="white-space:pre-wrap;">${item.content}</pre>
                    <button onclick="copySavedOutput(${item.id})">Copy</button>
                    <button onclick="deleteSavedOutput(${item.id}); showSavedItems();">Delete</button>
                </div>
            `).join('');
    }
    modal.style.display = 'block';
}

// Hide the modal
function closeSavedItems()
{
    document.getElementById('saved-items-modal').style.display = 'none';
}

// Copy output to clipboard
function copySavedOutput(id)
{
    const items = loadSavedOutputs();
    const item = items.find(i => i.id == id);
    if (item)
    {
        navigator.clipboard.writeText(item.content);
        alert('Copied!');
    }
}

// Function to save the current output to localStorage
function saveCurrentOutput(tabName)
{
    let outputArea;
    if (tabName === 'Bio')
    {
        outputArea = document.getElementById("bio-area");
    } else if (tabName === 'Profile')
    {
        outputArea = document.getElementById("profile-area");
    } else if (tabName === 'PortfolioSummary')
    {
        outputArea = document.getElementById("portfolio-area");
    }
    // Find the last AI bubble (the generated output)
    const bubbles = outputArea.getElementsByClassName("ai-bubble");
    if (bubbles.length === 0)
    {
        alert("No generated output to save!");
        return;
    }
    const lastOutput = bubbles[bubbles.length - 1].textContent;
    saveOutput(lastOutput, tabName);
    alert("Output saved!");
}

// Initial call to set the first tab ('Bio') as active on load
document.addEventListener('DOMContentLoaded', () =>
{
    // Ensures the 'Bio' tab is open and the button is highlighted when the page loads.
    openTab('Bio');
    document.getElementById('toneLabel').textContent = tones[currentToneIndex];
});
