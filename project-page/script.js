const copyButton = document.getElementById("copy-bibtex");
const bibtex = document.getElementById("bibtex");
const copyStatus = document.getElementById("copy-status");

function setCopyFeedback(buttonText, statusText) {
  if (copyButton) {
    copyButton.textContent = buttonText;
  }
  if (copyStatus) {
    copyStatus.textContent = statusText;
  }
}

function legacyCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }
  document.body.removeChild(textarea);
  return copied;
}

if (copyButton && bibtex) {
  copyButton.addEventListener("click", async () => {
    const original = copyButton.textContent;
    const text = bibtex.innerText.trim();
    let copied = false;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch (error) {
        copied = false;
      }
    }

    if (!copied) {
      copied = legacyCopy(text);
    }

    if (copied) {
      setCopyFeedback("Copied", "BibTeX copied to your clipboard.");
    } else {
      setCopyFeedback("Use Download BibTeX", "Clipboard access is unavailable here. Use the Download BibTeX button instead.");
    }

    window.setTimeout(() => {
      setCopyFeedback(original, "");
    }, 1800);
  });
}
