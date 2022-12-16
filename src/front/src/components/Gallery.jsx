import React, { useState, useEffect } from 'react';
import styles from './Gallery.module.css';
import Device from '../assets/device.svg';
import Configs from '../assets/config.svg';
import { Modal } from './Modal';
import { LocusButton } from './LocusButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function mock_macandress() {
    return 'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
        return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    });
}

export function Gallery() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const [devices, setDevices] = useState([]);

    function updateDevices() {
        axios
            .get('http://10.128.65.234:3131/api/device/get_all')
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    let devices_data = response.data;

                    setDevices(devices_data);
                }
            })
            .catch(function (error) {
                if (error.status === 401) {
                    navigate('/login');
                }
            });
    }

    useEffect(() => {
        updateDevices();
        const interval = setInterval(() => {
            updateDevices();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.root}>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
            <div className={styles.top}>
                <div className={styles.containerSearch}>
                    <h1 className={styles.titleTop}>Dispositivos</h1>
                    <div className={styles.search}>
                        <input
                            type="text"
                            placeholder="Pesquise por dispositivo"
                            className={styles.input}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.card}>
                    {devices.map((item) => {
                        return <DeviceCard {...item} />;
                    })}
                </div>
            </div>
        </div>
    );
}

const buzzer = (mac_str) => {
    axios.post('http://10.128.65.234:3131/api/device/locate', {
        mac_str: mac_str,
    });
};

const DeviceCard = ({
    mac_str,
    name,
    battery_percent,
    last_activity,
    room,
}) => {
    const MIN_BATTERY_WIDTH = 0;
    const MAX_BATTERY_WIDTH = 64;

    if (battery_percent == null) {
        battery_percent = 100;
    }

    if (room == null) {
        room = '?	';
    }

    const batteryWidth = (battery_percent / 100) * MAX_BATTERY_WIDTH;

    return (
        <div className={styles.deviceBox}>
            <div className={styles.alignRow}>
                <div>
                    <button onClick={() => console.log('está tudo bem')}>
                        <img
                            src={Configs}
                            alt="Configuration image"
                            width={40}
                        />
                    </button>
                    <button onClick={() => buzzer(mac_str)}>
                        <img src={Device} alt="Buzzer image" width={40} />
                    </button>
                </div>
                <p>Sala {room}</p>
            </div>
            <div className={styles.status}>
                <div className={styles.model}>
                    <h3>{name}</h3>
                    <h4 className={styles.lastActivity}>{last_activity}</h4>
                </div>
                <div className={styles.batteryBox}>
                    <h3 className={styles.gradient}>{battery_percent}%</h3>
                    <div
                        className={styles.bar}
                        style={{ width: batteryWidth }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
