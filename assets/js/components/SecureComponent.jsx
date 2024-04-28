// import React, { useEffect, useState } from 'react';

// const SecureComponent = () => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchSecureData = async () => {
//             const token = localStorage.getItem('jwt_token');

//             const response = await fetch('/api/some-secure-endpoint', {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Токен в заголовке
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setData(data);
//             } else {
//                 setError('Failed to fetch secure data');
//             }
//         };

//         fetchSecureData();
//     }, []); // Пустой массив зависимостей, чтобы эффект выполнялся один раз при монтировании

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!data) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Secure Data</h2>
//             <p>{JSON.stringify(data)}</p>
//         </div>
//     );
// };

// export default SecureComponent;
