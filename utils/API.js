import { Platform } from 'react-native';

export const requestUserAuthentication = async (userName, password) => {
    const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://127.0.0.1:5000';
    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: userName,
            password: password
        }),
    });

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        console.error(`Authentication failed: ${response.status} ${text}`);
        return null;
    }

    const data = await response.json();
    console.log(data);
    return data['token'];
};

export const generateResponse = async (token, photoUri, message) => {
    
    // For Android emulator, use. Will need to change to actual server IP if testing on real device.
    const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://127.0.0.1:5000';
    
    const url = `${baseUrl}/ask/${encodeURIComponent(token)}/${encodeURIComponent(message)}`;

    const formData = new FormData();
    if (photoUri) {
        const uri = photoUri;
        const fileName = uri.split('/').pop() || 'file';
        const ext = (fileName.split('.').pop() || '').toLowerCase();
        let mimeType = 'application/octet-stream';
        if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
        else if (ext === 'png') mimeType = 'image/png';
        else if (ext === 'wav') mimeType = 'audio/wav';
        else if (ext === 'mp4') mimeType = 'video/mp4';

        formData.append('file', {
            uri,
            name: fileName,
            type: mimeType,
        });
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Do not set Content-Type; let fetch add the multipart boundary
        },
        body: formData,
    });

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        console.error(`Server error: ${response.status} ${text}`);
        return null;
    }

    const data = await response.json();
    return data;
};

export const requestUserRegistration = async (userName, password, email, firstName, lastName) => {
    // For Android emulator, use. Will need to change to actual server IP if testing on real device.
    const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://127.0.0.1:5000';
    
    const response = await fetch(`${baseUrl}/create_user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: userName,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName
        }),
    });

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        console.error(`Registration failed: ${response.status} ${text}`);
        return false;
    }

    return true;
};
