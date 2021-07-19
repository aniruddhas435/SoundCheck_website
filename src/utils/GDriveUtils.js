const {google} = require('googleapis');

export default class GDriveUtils {

    constructor() {
        this.clientId = process.env.REACT_APP_CLIENT_ID;
        this.clientSecret = process.env.REACT_APP_CLIENT_SECRET;
        this.refreshToken = process.env.REACT_APP_REFRESH_TOCKEN;
        this.redirectURI = 'https://developers.google.com/oauthplayground';

        this.oauth2Client = new google.auth.OAuth2(
            this.clientId,
            this.clientSecret,
            this.redirectURI
        );

        this.oauth2Client.setCredentials({
            refresh_token: this.refreshToken
        });

        this.drive = google.drive({
            version: 'v3',
            auth: this.oauth2Client
        });
    }

    async uploadFile(file, fileName) {
        const driveFileId = null;
        try {
            const response = await this.drive.files.create({
                requestBody: {
                    name: fileName,
                    mimeType: 'text/plain'
                },
                media: {
                    mimeType: 'text/plain',
                    body: file.stream()
                }
            });

            driveFileId = response.json().id;
        } catch (error) {
            console.log(error.message);
        }

        return driveFileId;
    }

}