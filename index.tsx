import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    const [activeTab, setActiveTab] = useState('weather');
    const [loggedInUser, setLoggedInUser] = useState(null);

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            minHeight: '100vh',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            marginBottom: '30px',
        },
        title: {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#2d6a4f',
            margin: 0,
        },
        nav: {
            display: 'flex',
            gap: '10px',
        },
        navButton: {
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            borderRadius: '20px',
            background: 'transparent',
            color: '#2d6a4f',
            transition: 'all 0.3s ease',
        },
        activeNavButton: {
            background: 'rgba(67, 138, 104, 0.2)',
            color: '#1b4332',
        },
        mainContent: {
            padding: '20px',
        },
    };

    const handleLogin = (email) => {
        setLoggedInUser(email);
        setActiveTab('eco');
    };
    
    const handleLogout = () => {
        setLoggedInUser(null);
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>EcoWeather Initiative</h1>
                <nav style={styles.nav}>
                    <button
                        style={{...styles.navButton, ...(activeTab === 'weather' ? styles.activeNavButton : {})}}
                        onClick={() => setActiveTab('weather')}
                        aria-pressed={activeTab === 'weather'}
                    >
                        Weather
                    </button>
                    <button
                        style={{...styles.navButton, ...(activeTab === 'eco' ? styles.activeNavButton : {})}}
                        onClick={() => setActiveTab('eco')}
                        aria-pressed={activeTab === 'eco'}
                    >
                        Eco Initiative
                    </button>
                </nav>
            </header>
            <main style={styles.mainContent}>
                {activeTab === 'weather' && <Weather />}
                {activeTab === 'eco' && <EcoInitiative user={loggedInUser} onLogin={handleLogin} onLogout={handleLogout} />}
            </main>
        </div>
    );
};

// --- Weather Components ---

const WeatherIcons = {
    Sunny: () => <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffc300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
    "Partly Cloudy": () => <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4a90e2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><path d="M22 10a5.002 5.002 0 0 0-4.72-4.99C17.62 3.1 15.42 2 13 2a8.003 8.003 0 0 0-7.2 4.42"></path></svg>,
    "Heavy Rain": () => <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 13v8"></path><path d="M8 13v8"></path><path d="M12 15v8"></path><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>,
};


const Weather = () => {
    // Mock data
    const weatherData = {
        city: "Greenfield",
        current: { temp: 22, condition: "Sunny", rainChance: "10%" },
        forecast: [
            { day: "Mon", temp: 24, condition: "Sunny" },
            { day: "Tue", temp: 23, condition: "Partly Cloudy" },
            { day: "Wed", temp: 20, condition: "Partly Cloudy" },
            { day: "Thu", temp: 18, condition: "Heavy Rain" },
            { day: "Fri", temp: 21, condition: "Sunny" },
        ]
    };
    
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            () => {
                setError("Unable to retrieve your location. Please enable location services.");
            }
        );
    }, []);


    const styles = {
        wrapper: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' },
        currentWeatherCard: { background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '20px', padding: '30px', textAlign: 'center' },
        currentTemp: { fontSize: '4rem', fontWeight: 700, margin: '10px 0', color: '#1b4332' },
        currentCondition: { fontSize: '1.5rem', margin: '0 0 20px 0', color: '#40916c' },
        rainChance: { fontSize: '1rem', color: '#555' },
        forecastCard: { background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '20px', padding: '30px' },
        forecastGrid: { display: 'flex', justifyContent: 'space-around', textAlign: 'center' },
        forecastItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
        forecastDay: { fontSize: '1.2rem', fontWeight: 600, color: '#2d6a4f' },
        forecastTemp: { fontSize: '1.2rem', fontWeight: 600, color: '#555'},
        locationMessage: { textAlign: 'center', fontSize: '1.2rem', color: '#d9534f', background: 'rgba(255,255,255,0.8)', padding: '20px', borderRadius: '15px'},
    };

    if (error) {
        return <p style={styles.locationMessage}>{error}</p>;
    }
    
    if (!location) {
         return <p style={styles.locationMessage}>Fetching your location...</p>;
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.currentWeatherCard}>
                <h3>Current Weather in {weatherData.city}</h3>
                {WeatherIcons[weatherData.current.condition]()}
                <p style={styles.currentTemp}>{weatherData.current.temp}°C</p>
                <p style={styles.currentCondition}>{weatherData.current.condition}</p>
                <p style={styles.rainChance}>Chance of rain: {weatherData.current.rainChance}</p>
            </div>
            <div style={styles.forecastCard}>
                <h3>5-Day Forecast</h3>
                <div style={styles.forecastGrid}>
                    {weatherData.forecast.map(day => (
                        <div key={day.day} style={styles.forecastItem}>
                            <p style={styles.forecastDay}>{day.day}</p>
                            {WeatherIcons[day.condition]()}
                            <p style={styles.forecastTemp}>{day.temp}°C</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Eco Initiative Components ---

const mockLeaderboardData = [
    { id: 1, name: 'Alice Johnson', points: 150 },
    { id: 2, name: 'Bob Williams', points: 120 },
    { id: 3, name: 'Charlie Brown', points: 110 },
    { id: 4, name: 'Diana Miller', points: 90 },
    { id: 5, name: 'Ethan Davis', points: 50 },
];

const EcoInitiative = ({ user, onLogin, onLogout }) => {
    const [leaderboard, setLeaderboard] = useState(mockLeaderboardData);

    const addPoints = (userName, pointsToAdd) => {
        setLeaderboard(prev => {
            const userExists = prev.some(u => u.name === userName);
            let updatedList;
            if (userExists) {
                updatedList = prev.map(u => u.name === userName ? { ...u, points: u.points + pointsToAdd } : u);
            } else {
                updatedList = [...prev, { id: prev.length + 1, name: userName, points: pointsToAdd }];
            }
            return updatedList.sort((a, b) => b.points - a.points);
        });
    };
    
    const styles = {
        wrapper: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', alignItems: 'start' },
        card: { background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '20px', padding: '30px' },
    };

    if (!user) {
        return <Login onLogin={onLogin} />;
    }

    const userName = user.split('@')[0].replace(/\./g, ' ').replace(/\d+/g, '').trim().replace(/\b\w/g, l => l.toUpperCase());


    return (
        <div style={styles.wrapper}>
            <SubmitProof onLogout={onLogout} userName={userName} onProofSubmit={() => addPoints(userName, 10)} />
            <Leaderboard data={leaderboard} currentUser={userName} />
        </div>
    );
};

const Login = ({ onLogin }) => {
    const [step, setStep] = useState('email'); // 'email' or 'otp'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const MAGIC_OTP = '123456';

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        const collegeDomain = '@jecrc.ac.in';
        if (email.toLowerCase().endsWith(collegeDomain)) {
            setError('');
            setStep('otp');
        } else {
            setError(`Login failed. Please use your ${collegeDomain} email.`);
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp === MAGIC_OTP) {
            setError('');
            onLogin(email);
        } else {
            setError('Invalid OTP. Please try again.');
        }
    };
    
    const goBack = () => {
        setStep('email');
        setError('');
        setOtp('');
    }

    const styles = {
        loginContainer: { maxWidth: '400px', margin: '50px auto', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.3)' },
        title: { color: '#1b4332', marginBottom: '10px' },
        subtitle: { color: '#40916c', marginBottom: '30px' },
        form: { display: 'flex', flexDirection: 'column', gap: '20px' },
        input: { padding: '15px', border: '1px solid #ccc', borderRadius: '10px', fontSize: '1rem', textAlign: 'center' },
        button: { padding: '15px', border: 'none', borderRadius: '10px', background: '#4CAF50', color: 'white', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.3s' },
        backButton: { background: 'transparent', color: '#555', cursor: 'pointer', border: 'none', marginTop: '15px'},
        error: { color: 'red', marginTop: '10px', minHeight: '20px' },
        otpInfo: { color: '#2d6a4f', marginBottom: '20px' },
    };

    if (step === 'otp') {
        return (
             <div style={styles.loginContainer}>
                <h2 style={styles.title}>Verify Your Identity</h2>
                <p style={styles.otpInfo}>An OTP has been sent to <strong>{email}</strong>. (Hint: It's {MAGIC_OTP})</p>
                <form onSubmit={handleOtpSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={styles.input}
                        maxLength="6"
                        required
                        aria-label="One-Time Password"
                    />
                    <button type="submit" style={styles.button}>Verify & Login</button>
                </form>
                <button onClick={goBack} style={styles.backButton}>Use a different email</button>
                {error && <p style={styles.error} role="alert">{error}</p>}
            </div>
        )
    }

    return (
        <div style={styles.loginContainer}>
            <h2 style={styles.title}>Student Login</h2>
            <p style={styles.subtitle}>Access the leaderboard & submit your contribution!</p>
            <form onSubmit={handleEmailSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="your.name@jecrc.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                    aria-label="College Email"
                />
                <button type="submit" style={styles.button}>Send OTP</button>
            </form>
            {error && <p style={styles.error} role="alert">{error}</p>}
        </div>
    );
};

const SubmitProof = ({ userName, onProofSubmit, onLogout }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setSubmitted(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(imagePreview) {
            onProofSubmit();
            setSubmitted(true);
            setImagePreview(null);
            e.target.reset();
        }
    };
    
     const styles = {
        card: { background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '20px', padding: '30px' },
        header: {display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
        title: { color: '#1b4332', marginTop: 0 },
        welcome: { color: '#2d6a4f', marginBottom: '20px' },
        form: { display: 'flex', flexDirection: 'column', gap: '20px' },
        fileInputLabel: { padding: '15px', border: '2px dashed #4CAF50', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', color: '#4CAF50' },
        fileInput: { display: 'none' },
        imagePreview: { maxWidth: '100%', maxHeight: '200px', borderRadius: '10px', objectFit: 'cover' },
        button: { padding: '15px', border: 'none', borderRadius: '10px', background: '#4CAF50', color: 'white', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer' },
        logoutButton: { background: 'transparent', border: '1px solid #d9534f', color: '#d9534f', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer' },
        successMessage: { color: 'green', textAlign: 'center', fontWeight: 600 },
     };

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <h2 style={styles.title}>Plant a Tree, Earn Points!</h2>
                <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
            </div>
            <p style={styles.welcome}>Welcome, {userName}!</p>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label htmlFor="file-upload" style={styles.fileInputLabel}>
                    {imagePreview ? 'Change Photo' : '+ Upload Photo Proof'}
                </label>
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
                {imagePreview && <img src={imagePreview} alt="Tree planting proof preview" style={styles.imagePreview} />}
                <button type="submit" disabled={!imagePreview} style={{...styles.button, opacity: imagePreview ? 1: 0.5 }}>Submit for 10 Points</button>
                 {submitted && <p style={styles.successMessage}>Thank you! Your submission is pending review.</p>}
            </form>
        </div>
    );
};

const Leaderboard = ({ data, currentUser }) => {
    const styles = {
        card: { background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '20px', padding: '30px' },
        title: { color: '#1b4332', marginTop: 0, textAlign: 'center' },
        list: { listStyle: 'none', padding: 0, margin: 0 },
        listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderRadius: '10px', marginBottom: '10px', background: 'rgba(255, 255, 255, 0.5)' },
        currentUserItem: { background: 'rgba(76, 175, 80, 0.2)'},
        rank: { fontSize: '1.2rem', fontWeight: 600, color: '#40916c', minWidth: '30px' },
        name: { fontSize: '1.1rem', fontWeight: 600, flexGrow: 1, marginLeft: '15px' },
        points: { fontSize: '1.2rem', fontWeight: 700, color: '#1b4332', background: 'rgba(216, 243, 220, 0.8)', padding: '5px 15px', borderRadius: '15px' },
    };

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>Leaderboard</h2>
            <ul style={styles.list}>
                {data.map((user, index) => (
                    <li key={user.id} style={{ ...styles.listItem, ...(user.name === currentUser ? styles.currentUserItem : {})}}>
                        <span style={styles.rank}>{index + 1}</span>
                        <span style={styles.name}>{user.name}</span>
                        <span style={styles.points}>{user.points}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);