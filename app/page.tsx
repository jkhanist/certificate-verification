'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

// Domain model for company data
interface CompanyData {
  Company: string;
  Website: string;
  Person: string;
  Phone: string;
  Email: string;
}

export default function CompanySearch() {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);
        const response = await fetch(
          'https://opensheet.elk.sh/1alsvX-fNp0fmvkhINMzMAfUcAl4i752s6TeLYRnnxRg/ATP'
        );
        const data: CompanyData[] = await response.json();
        setCompanies(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    }
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    Object.values(company).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <input
          type='text'
          placeholder='Search companies...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {loading ? (
          <div>Fetching data...</div>
        ) : (
          <table className={styles.table}>
            {companies.length === 0 ? (
              <caption></caption>
            ) : (
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Website</th>
                  <th>Person</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
            )}
            <tbody>
              {filteredCompanies.map((company, index) => (
                <tr key={index}>
                  <td>{company.Company}</td>
                  <td>{company.Website}</td>
                  <td>{company.Person}</td>
                  <td>{company.Phone}</td>
                  <td>{company.Email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
