// --- State ---
let notes = [];
let editingNoteId = null;

// --- DOM ---
const notesContainer = document.getElementById('notes-container');
const noteDialog = document.getElementById('note-dialog');
const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const dialogTitle = document.getElementById('dialog-title');
const themeToggleButton = document.getElementById('theme-toggle-button');

// Init
document.addEventListener('DOMContentLoaded', () => {
    applyStoredTheme();
    notes = loadNotes();
    renderNotes();
});

// Close modal when clicking outside
noteDialog.addEventListener('click', (e) => {
    if (e.target === noteDialog) closeNoteDialog();
});

// --- Dialog ---
function openNoteDialog(id = null) {
    noteForm.reset();

    if (id) {
        editingNoteId = id;
        dialogTitle.textContent = "Edit Note";
        const n = notes.find(x => x.id === id);
        if (n) {
            titleInput.value = n.title;
            contentInput.value = n.content;
        }
    } else {
        editingNoteId = null;
        dialogTitle.textContent = "Add New Note";
    }

    noteDialog.showModal();
    titleInput.focus();
}

function closeNoteDialog() {
    noteDialog.close();
    editingNoteId = null;
}

// --- CRUD ---
function saveNote(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) return;

    if (editingNoteId) {
        const idx = notes.findIndex(n => n.id === editingNoteId);
        notes[idx] = { ...notes[idx], title, content };
    } else {
        const newNote = {
            id: Date.now().toString(),
            title,
            content,
            date: new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
        };
        notes.unshift(newNote);
    }

    saveNotesToStorage();
    renderNotes();
    closeNoteDialog();
}

function deleteNote(id) {
    if (!confirm("Are you sure you want to delete this note?")) return;
    notes = notes.filter(n => n.id !== id);
    saveNotesToStorage();
    renderNotes();
}

// --- Storage ---
function loadNotes() {
    return JSON.parse(localStorage.getItem('quick-notes')) || [];
}

function saveNotesToStorage() {
    localStorage.setItem('quick-notes', JSON.stringify(notes));
}

// --- Render ---
function renderNotes() {
    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div class="col-span-3 text-center py-12 opacity-50">
                <i class="fas fa-clipboard text-6xl mb-4 text-gray-400 dark:text-gray-600"></i>
                <h2 class="text-xl font-semibold">No notes yet</h2>
                <p class="mt-2">Create your first note by clicking "Add Note".</p>
            </div>
        `;
        return;
    }

    notesContainer.innerHTML = notes.map(note => `
        <div class="bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 group h-64 overflow-hidden relative">
            <div>
                <h3 class="text-lg font-bold mb-2 line-clamp-2">${escapeHtml(note.title)}</h3>
                <p class="text-xs text-gray-400 mb-3">${note.date}</p>
                <p class="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-wrap line-clamp-6">${escapeHtml(note.content)}</p>
            </div>

            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-dark p-1 rounded-lg shadow-sm">
                <button onclick="openNoteDialog('${note.id}')" class="text-blue-500 hover:text-blue-700 p-1.5">
                    <i class="fas fa-pen"></i>
                </button>
                <button onclick="deleteNote('${note.id}')" class="text-red-500 hover:text-red-700 p-1.5">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Helper XSS-safe
function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])
    );
}

// --- Theme ---
function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon(isDark);
}

function applyStoredTheme() {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDark = stored === "dark" || (!stored && prefersDark);

    document.documentElement.classList.toggle("dark", isDark);
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    themeToggleButton.textContent = isDark ? "☀️" : "🌙";
}

// Expose ke global
window.openNoteDialog = openNoteDialog;
window.closeNoteDialog = closeNoteDialog;
window.saveNote = saveNote;
window.deleteNote = deleteNote;
window.toggleTheme = toggleTheme;
