import React, { useState, useEffect } from 'react';

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  // Загрузка списка файлов при монтировании компонента
  useEffect(() => {
    loadFilesList();
  }, []);

  const loadFilesList = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/files');
      if (response.ok) {
        const filesList = await response.json();
        setFiles(filesList);
      }
    } catch (error) {
      console.error('Ошибка при загрузке списка файлов:', error);
    } finally {
      setLoading(false);
    }
  };

  const createFile = async () => {
    if (!fileName.trim() || !fileContent.trim()) {
      alert('Пожалуйста, введите имя файла и содержимое');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/files/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: fileName.trim(),
          content: fileContent
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert('Файл успешно создан!');
        setFileName('');
        setFileContent('');
        loadFilesList(); // Обновляем список файлов
      } else {
        const error = await response.json();
        alert(`Ошибка при создании файла: ${error.message}`);
      }
    } catch (error) {
      console.error('Ошибка при создании файла:', error);
      alert('Ошибка при создании файла');
    } finally {
      setLoading(false);
    }
  };

  const loadFile = async (filename) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/files/${filename}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedFile(filename);
        setFileContent(data.content);
        setFileName(filename);
      } else {
        alert('Ошибка при загрузке файла');
      }
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
      alert('Ошибка при загрузке файла');
    } finally {
      setLoading(false);
    }
  };

  const saveFile = async () => {
    if (!selectedFile || !fileContent.trim()) {
      alert('Нет выбранного файла или содержимого для сохранения');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/files/${selectedFile}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: fileContent
        })
      });

      if (response.ok) {
        alert('Файл успешно сохранен!');
      } else {
        const error = await response.json();
        alert(`Ошибка при сохранении файла: ${error.message}`);
      }
    } catch (error) {
      console.error('Ошибка при сохранении файла:', error);
      alert('Ошибка при сохранении файла');
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (filename) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Вы уверены, что хотите удалить файл "${filename}"?`)) {

      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/files/${filename}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Файл успешно удален!');
        if (selectedFile === filename) {
          setSelectedFile(null);
          setFileContent('');
          setFileName('');
        }
        loadFilesList(); // Обновляем список файлов
      } else {
        const error = await response.json();
        alert(`Ошибка при удалении файла: ${error.message}`);
      }
    } catch (error) {
      console.error('Ошибка при удалении файла:', error);
      alert('Ошибка при удалении файла');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Менеджер файлов</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {/* Список файлов */}
        <div style={{ flex: '1', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h3>Список файлов</h3>
          {loading && <p>Загрузка...</p>}
          {files.length === 0 && !loading && <p>Файлы не найдены</p>}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {files.map((file, index) => (
              <li key={index} style={{ 
                padding: '8px', 
                margin: '5px 0', 
                backgroundColor: selectedFile === file ? '#e3f2fd' : '#f5f5f5',
                borderRadius: '3px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span 
                  onClick={() => loadFile(file)}
                  style={{ cursor: 'pointer', flex: 1 }}
                >
                  {file}
                </span>
                <button 
                  onClick={() => deleteFile(file)}
                  style={{ 
                    backgroundColor: '#f44336', 
                    color: 'white', 
                    border: 'none', 
                    padding: '4px 8px', 
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  disabled={loading}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
          <button 
            onClick={loadFilesList}
            style={{ 
              backgroundColor: '#2196F3', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
            disabled={loading}
          >
            Обновить список
          </button>
        </div>

        {/* Редактор файлов */}
        <div style={{ flex: '2', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h3>Редактор файлов</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label>
              Имя файла:
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Введите имя файла"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  margin: '5px 0', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px' 
                }}
                disabled={loading}
              />
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>
              Содержимое файла:
              <textarea
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                placeholder="Введите содержимое файла"
                rows={15}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  margin: '5px 0', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '14px'
                }}
                disabled={loading}
              />
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={createFile}
              style={{ 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              disabled={loading}
            >
              Создать файл
            </button>
            
            {selectedFile && (
              <button 
                onClick={saveFile}
                style={{ 
                  backgroundColor: '#FF9800', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                disabled={loading}
              >
                Сохранить изменения
              </button>
            )}
          </div>

          {selectedFile && (
            <p style={{ marginTop: '10px', color: '#666' }}>
              Редактируется файл: <strong>{selectedFile}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileManager;

