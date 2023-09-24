const textarea = document.getElementById("linkTextarea");

document.getElementById("openLinks").addEventListener("click", () => {
    const textarea = document.getElementById("linkTextarea");
    if (textarea) {
        const links = textarea.value.split(/,|\n/).map((link) => link.trim());

        for (const link of links) {
            if (link) {
                let modifiedLink = link;
                // Check if the link has a TLD but doesn't start with 'http://' or 'https://'
                const hasTLD = /\.[A-Za-z]{2,}$/.test(link);
                if (!hasTLD) {
                    // If link doesn't have a TLD, perform a Google search
                    modifiedLink = `https://www.google.com/search?q=${encodeURIComponent(link)}`;
                } else if (!link.toLowerCase().startsWith('http://') && !link.toLowerCase().startsWith('https://')) {
                    // If link has a TLD but doesn't start with 'http://' or 'https://', prepend 'http://'
                    modifiedLink = `http://${link}`;
                }

                chrome.tabs.create({ url: modifiedLink });
            }
        }
    }
});


