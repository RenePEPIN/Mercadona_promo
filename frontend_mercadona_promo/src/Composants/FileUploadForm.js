import React, { useState } from 'react';
import axios from 'axios';

function FileUploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Réponse du serveur :', response.data);
        } catch (error) {
            console.error(
                'Erreur lors de la soumission du formulaire :',
                error
            );
        }
    };

    return (
        <div>
            <h1>Formulaire de Téléchargement d'Image</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="image">Sélectionnez une image :</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <button type="submit">Envoyer</button>
                </div>
            </form>
        </div>
    );
}

export default FileUploadForm;
