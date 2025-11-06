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

// Initial call to set the first tab ('Bio') as active on load
document.addEventListener('DOMContentLoaded', () =>
{
    // Ensures the 'Bio' tab is open and the button is highlighted when the page loads.
    openTab('Bio');
});

// Backend
// Data Persitence Logic
const STORAGE_KEY = 'aiPortfolioAssistantData';

// Save an output to localStorage
function saveOutput(content, type)
{
    const items = loadSavedOutputs();
    const newItem = {
        id: Date.now(), // Use timestamp as a simple unique ID
        content: content,
        type: type
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
    // Note: id from dataset is a string, item.id is a number
    items = items.filter(item => item.id != id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Clear all user data from localStorage
function clearAllUserData()
{
    localStorage.removeItem(STORAGE_KEY);
}
