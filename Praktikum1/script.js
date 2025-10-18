document.addEventListener('DOMContentLoaded', () => {

    // Elemen-elemen DOM
    const taskForm = document.getElementById('task-form');
    const namaTugasInput = document.getElementById('nama-tugas');
    const mataKuliahInput = document.getElementById('mata-kuliah');
    const deadlineInput = document.getElementById('deadline');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelector('.filter-buttons');
    
    // Modal Edit Elements
    const modal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editTaskId = document.getElementById('edit-task-id');
    const editNamaTugas = document.getElementById('edit-nama-tugas');
    const editMataKuliah = document.getElementById('edit-mata-kuliah');
    const editDeadline = document.getElementById('edit-deadline');
    const closeButton = document.querySelector('.close-button');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        
        taskList.innerHTML = '';
        
        let filteredTasks = tasks;

        if (currentFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.status === currentFilter);
        }

        const searchQuery = searchInput.value.toLowerCase();
        if (searchQuery) {
            filteredTasks = filteredTasks.filter(task => 
                task.namaTugas.toLowerCase().includes(searchQuery) || 
                task.mataKuliah.toLowerCase().includes(searchQuery)
            );
        }

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<li class="empty-message">Tidak ada tugas yang cocok.</li>';
        } else {
            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.status}`;
                li.dataset.id = task.id;

                li.innerHTML = `
                    <input type="checkbox" class="status-checkbox" ${task.status === 'selesai' ? 'checked' : ''}>
                    <div class="task-details">
                        <h3>${task.namaTugas}</h3>
                        <p><strong>Matkul:</strong> ${task.mataKuliah} | <strong>Deadline:</strong> ${formatDate(task.deadline)}</p>
                    </div>
                    <div class="task-actions">
                        <button class="action-btn edit-btn">✏️</button>
                        <button class="action-btn delete-btn">🗑️</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
        
        updateTaskCount();
    };

    const updateTaskCount = () => {
        const uncompletedTasks = tasks.filter(task => task.status === 'belum selesai').length;
        taskCount.textContent = uncompletedTasks;
    };

    /**
     * Menampilkan notifikasi toast.
     * @param {string} message - Pesan yang akan ditampilkan.
    @param {string} type - Tipe notifikasi ('success', 'error', 'info').
     */
    const showToast = (message, type = 'success') => {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'show';
        toast.classList.add(type);
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    };
    
    /**
     * Memvalidasi form tambah/edit tugas.
     * @returns {boolean} - True jika valid, false jika tidak.
     */
    const validateForm = () => {
        let isValid = true;
        document.getElementById('nama-error').textContent = '';
        document.getElementById('matkul-error').textContent = '';
        document.getElementById('deadline-error').textContent = '';

        if (namaTugasInput.value.trim() === '') {
            document.getElementById('nama-error').textContent = 'Nama tugas tidak boleh kosong.';
            isValid = false;
        }
        if (mataKuliahInput.value.trim() === '') {
            document.getElementById('matkul-error').textContent = 'Mata kuliah tidak boleh kosong.';
            isValid = false;
        }
        if (deadlineInput.value === '') {
            document.getElementById('deadline-error').textContent = 'Deadline harus diisi.';
            isValid = false;
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const deadlineDate = new Date(deadlineInput.value);
            if (deadlineDate < today) {
                document.getElementById('deadline-error').textContent = 'Deadline tidak boleh di masa lalu.';
                isValid = false;
            }
        }
        return isValid;
    };

    /**
     * Memformat tanggal ke format yang lebih mudah dibaca.
     * @param {string} dateString - String tanggal (YYYY-MM-DD).
     * @returns {string} - Tanggal yang diformat (e.g., "25 Oktober 2025").
     */
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newTask = {
            id: Date.now(),
            namaTugas: namaTugasInput.value.trim(),
            mataKuliah: mataKuliahInput.value.trim(),
            deadline: deadlineInput.value,
            status: 'belum selesai'
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskForm.reset();
        showToast('Tugas berhasil ditambahkan!', 'success');
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const taskItem = target.closest('.task-item');
        if (!taskItem) return;
        
        const taskId = Number(taskItem.dataset.id);

        if (target.classList.contains('delete-btn')) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasks();
            taskItem.classList.add('fade-out');
            setTimeout(() => {
                renderTasks();
                showToast('Tugas berhasil dihapus.', 'info');
            }, 300);
        } else if (target.classList.contains('edit-btn')) {
            const taskToEdit = tasks.find(task => task.id === taskId);
            editTaskId.value = taskToEdit.id;
            editNamaTugas.value = taskToEdit.namaTugas;
            editMataKuliah.value = taskToEdit.mataKuliah;
            editDeadline.value = taskToEdit.deadline;
            modal.style.display = 'block';
        } else if (target.classList.contains('status-checkbox')) {
            const taskToToggle = tasks.find(task => task.id === taskId);
            taskToToggle.status = target.checked ? 'selesai' : 'belum selesai';
            saveTasks();
            renderTasks();
        }
    });

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskId = Number(editTaskId.value);
        
        tasks = tasks.map(task => 
            task.id === taskId ? {
                ...task,
                namaTugas: editNamaTugas.value.trim(),
                mataKuliah: editMataKuliah.value.trim(),
                deadline: editDeadline.value
            } : task
        );
        
        saveTasks();
        renderTasks();
        modal.style.display = 'none';
        showToast('Tugas berhasil diperbarui!', 'success');
    });

    closeButton.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    searchInput.addEventListener('input', renderTasks);
    
    filterButtons.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelector('.filter-buttons .btn.active').classList.remove('active');
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderTasks();
        }
    });

    renderTasks();
});