'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

interface CertificateData {
  'Full Name': string;
  'Course Name': string;
  'Hours Completed': string;
  'Certificate No': string;
  'Date Of Issue': string;
  Status: string;
}

export default function CertificateSearch() {
  const [certificateNo, setCertificateNo] = useState('');
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://opensheet.elk.sh/1alsvX-fNp0fmvkhINMzMAfUcAl4i752s6TeLYRnnxRg/Certificates',
        {
          cache: 'no-store', // Disable caching
        }
      );
      const data: CertificateData[] = await response.json();

      const foundCertificate = data.find(
        (cert) => cert['Certificate No'] === certificateNo
      );

      if (foundCertificate) {
        setCertificateData(foundCertificate);
        setError('');
        setLoading(false);
      } else {
        setCertificateData(null);
        setError('Certificate not found');
        setLoading(false);
      }
    } catch (err) {
      setError('Error searching for certificate' + err);
      setCertificateData(null);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type='text'
          placeholder='Enter your certificate no.'
          value={certificateNo}
          onChange={(e) => setCertificateNo(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <button onClick={handleSearch} className={styles.button}>
            Search Certificate
          </button>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {loading && (
        <div className={styles.loading}>Searching certificate...</div>
      )}
      {!loading && certificateData && (
        <div
          className={
            certificateData.Status === 'Valid'
              ? styles.resultContainer
              : styles.invalidResultContainer
          }
        >
          <h2>
            {certificateData['Status'] === 'Expired' ? 'Expired' : 'Valid'}{' '}
            Certificate{' '}
          </h2>
          <div className={styles.detail}>
            <strong>Full Name:</strong> {certificateData['Full Name']}
          </div>
          <div className={styles.detail}>
            <strong>Course Name:</strong> {certificateData['Course Name']}
          </div>
          <div className={styles.detail}>
            <strong>Hours Completed:</strong>{' '}
            {certificateData['Hours Completed']}
          </div>
          <div className={styles.detail}>
            <strong>Certificate No:</strong> {certificateData['Certificate No']}
          </div>
          <div className={styles.detail}>
            <strong>Date Of Issue:</strong> {certificateData['Date Of Issue']}
          </div>
          <div className={styles.detail}>
            <strong>Status:</strong> {certificateData['Status']}
          </div>
        </div>
      )}
    </div>
  );
}
