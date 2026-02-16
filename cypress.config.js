require('dotenv').config();
import { defineConfig } from 'cypress';
import { get } from 'axios';
import nodemailer from 'nodemailer';
import { spawn } from 'child_process';
import { createConnection } from 'net';
import { existsSync, emptyDir } from 'fs-extra';
import path from 'path';
import fs from 'fs';
import { extractRawText } from 'mammoth';

export default defineConfig({
  allowCypressEnv: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  trashAssetsBeforeRuns: false,
  screenshotOnRunFailure: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'AOFI Krediti QA Izveštaj',
    embeddedScreenshots: false,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env: {
    pravnoLice_email: process.env.CYPRESS_PRAVNO_LICE_EMAIL,
    pravnoLice_password: process.env.CYPRESS_PRAVNO_LICE_PASSWORD,
    pravnoLice_username: process.env.CYPRESS_PRAVNO_LICE_USERNAME,
    preduzetnik_firstName: process.env.CYPRESS_PREDUZETNIK_FIRSTNAME,
    preduzetnik_lastName: process.env.CYPRESS_PREDUZETNIK_LASTNAME,
    preduzetnik_email: process.env.CYPRESS_PREDUZETNIK_EMAIL,
    preduzetnik_password: process.env.CYPRESS_PREDUZETNIK_PASSWORD,
    preduzetnik_username: process.env.CYPRESS_PREDUZETNIK_USERNAME,
    invalid_email: process.env.CYPRESS_INVALID_EMAIL,
    invalid_password: process.env.CYPRESS_INVALID_PASSWORD,
    sql_inject_password: process.env.CYPRESS_SQL_PASSWORD_INJECT,
    sql_inject_email: process.env.CYPRESS_SQL_EMAIL_INJECT,
    tubeIQ_url: process.env.CYPRESS_TUBEIQ_URL,
    tubeIQ_registration_url: process.env.CYPRESS_TUBEIQ_REGISTRATION_URL,
    tubeIQ_registration_password: process.env.CYPRESS_TUBEIQ_REGISTRATION_PASSWORD,
    tubeIQ_valid_user: process.env.CYPRESS_TUBEIQ_VALID_USER,
    tubeIQ_valid_name: process.env.CYPRESS_TUBEIQ_VALID_NAME,
    tubeIQ_valid_user_number: process.env.CYPRESS_TUBEIQ_VALID_USER_NUMBER,
    tubeIQ_valid_login_email: process.env.CYPRESS_TUBEIQ_VALID_EMAIL,
    tubeIQ_valid_login_password: process.env.CYPRESS_TUBEIQ_VALID_PASSWORD,
  },
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    testIsolation: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // // Start smtp4dev before tests
      // const smtpProcess = spawn('Rnwood.Smtp4dev', [], {
      //   shell: true,
      //   detached: true,
      //   stdio: 'ignore',
      // });
      // // Save PID
      // smtpProcess.unref();

      on('task', {
        findFirstExistingFile({ folder, fileNames }) {
          for (const fileName of fileNames) {
            const filePath = path.join(folder, fileName);
            if (fs.existsSync(filePath)) {
              return filePath;
            }
          }
          return null;
        },
        deleteFolder(folderPath) {
          return new Promise((resolve, reject) => {
            if (existsSync(folderPath)) {
              emptyDir(folderPath, (err) => {
                if (err) {
                  console.error(err);
                  return reject(err);
                }
                console.log(`✓ Folder ${folderPath} cleared`);
                resolve(null);
              });
            } else {
              console.log(`Folder ${folderPath} does not exist`);
              resolve(null);
            }
          });
        },
        async readDocxFile(filePath) {
          try {
            const result = await extractRawText({ path: filePath });
            return result.value;
          } catch (error) {
            throw new Error(`Error reading docx: ${error.message}`);
          }
        },

        log(message) {
          console.log(message);
          return null;
        },
        async getLastEmail(to) {
          to = decodeURIComponent(to).trim().toLowerCase();
          const res = await get('http://localhost:5000/api/messages');
          const messages = Array.isArray(res.data.results) ? res.data.results : [];
          console.log(`Ukupno poruka: ${messages.length}`);
          messages.forEach((msg, i) => {
            console.log(`Poruka ${i + 1}:`, {
              to: msg.to,
              from: msg.from,
              subject: msg.subject,
              date: msg.date,
              id: msg.id,
            });
          });
          console.log(`Tražim email za: ${to}`);
          const allRecipients = messages.flatMap(
            (msg) => msg.to?.map((r) => (typeof r === 'string' ? r : r.address)) || []
          );
          console.log('Sve adrese u porukama:', allRecipients);
          const match = messages.find((msg) =>
            msg.to?.some?.((recipient) => {
              const address =
                typeof recipient === 'string'
                  ? recipient.toLowerCase()
                  : recipient.address?.toLowerCase();
              return address === to;
            })
          );
          return match || null;
        },
        startSmtp() {
          const { spawn } = require('child_process');
          const smtpProcess = spawn('Rnwood.Smtp4dev', [], {
            shell: true,
            detached: true,
            stdio: 'ignore',
          });
          smtpProcess.unref();
          console.log('SMTP server pokrenut iz testa');
          return true;
        },
        waitForSmtpReady() {
          return new Promise((resolve, reject) => {
            const timeout = 10000;
            const start = Date.now();

            const check = () => {
              const socket = createConnection(25, 'localhost');
              socket.on('connect', () => {
                socket.end();
                resolve(true);
              });
              socket.on('error', () => {
                if (Date.now() - start > timeout) {
                  reject(new Error('SMTP server nije spreman'));
                } else {
                  setTimeout(check, 500);
                }
              });
            };

            check();
          });
        },
        async sendTestEmail(to) {
          try {
            const crypto = require('crypto');
            const userId = crypto.randomUUID();
            const code = encodeURIComponent('dummyConfirmationCode123');
            const confirmationUrl = `${process.env.CYPRESS_TUBEIQ_URL}Account/ConfirmEmail?userId=${userId}&code=${code}&spaceId=0&plan=Professional`;
            const htmlBody = `
      <div class="inbox-data-content-intro">
        <h1>Hello ${to.split('@')[0]} !</h1>
        <h3>You're almost officially in !</h3><br>
        <a href="${confirmationUrl}" style="
          display: inline-block;
          width: 200px;
          padding: 10px;
          background-color: rgb(66, 139, 202);
          color: white;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.4285;
          text-align: center;
          text-decoration: none;
          border: 1px solid transparent;
          border-radius: 4px;
          cursor: pointer;
        ">
          Confirm your account
        </a><br><br>
        <h3>Thanks,<br> team </h3>
      </div>
    `;
            const transporter = require('nodemailer').createTransport({
              host: 'localhost',
              port: 25,
              secure: false,
              tls: { rejectUnauthorized: false },
            });
            const info = await transporter.sendMail({
              from: 'test@example.com',
              to,
              subject: 'Registration email for TubeIQ Platform: Confirm your account',
              html: htmlBody,
            });
            console.log('✅ Email sent:', info);
            return true;
          } catch (error) {
            console.error('❌ Greška pri slanju emaila:', error);
            throw error;
          }
        },

        //     async sendTestEmail(to) {
        //       try {
        //         const transporter = require('nodemailer').createTransport({
        //           host: 'localhost',
        //           port: 25,
        //           secure: false,
        //           tls: {
        //             rejectUnauthorized: false, // ✅ ako smtp4dev koristi self-signed certifikat
        //           },
        //         });
        //         const confirmationUrl = `http://localhost:3000/confirm?email=${encodeURIComponent(to)}`;
        //         const htmlBody = `
        //   <p>Kliknite na dugme ispod da potvrdite nalog:</p>
        //   <a href="${confirmationUrl}">
        //     <button style="
        //       cursor: pointer;
        //       width: 200px;
        //       color: white;
        //       background-color: #428bca;
        //       font-size: 14px;
        //       font-weight: 400;
        //       line-height: 1.4285;
        //       border: 1px solid transparent;
        //       border-radius: 4px;
        //     ">Potvrdi nalog</button>
        //   </a>
        // `;
        //         const info = await transporter.sendMail({
        //           from: 'test@example.com',
        //           to,
        //           subject: 'Registration email for TubeIQ Platform: Confirm your account',
        //           html: htmlBody,
        //         });
        //         console.log('Email poslat:', info);
        //         return true;
        //       } catch (error) {
        //         console.error('Greška pri slanju emaila:', error);
        //         throw error;
        //       }
        //     },
      });

      return config;
    },
  },
});
