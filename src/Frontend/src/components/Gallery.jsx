import React from 'react';
import { useState } from 'react';
import styles from './Gallery.module.css';
import Device from '../assets/device.svg';
import { Modal } from './Modal';
import { LocusButton } from './LocusButton';

function mock_macandress() {
    return 'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
        return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    });
}

export function Gallery() {
    const [count, setCount] = useState([
        {
            mac_str: mock_macandress(),
            battery_percent: 100,
            last_activity: 'Last activity: 1 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 67,
            last_activity: 'Last activity: 6 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 40,
            last_activity: 'Last activity: 6 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 90,
            last_activity: 'Last activity: 7 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 23,
            last_activity: 'Last activity: 1 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 0,
            last_activity: 'Last activity: 4 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 80,
            last_activity: 'Last activity: 2 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 50,
            last_activity: 'Last activity: 5 days ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 99,
            last_activity: 'Last activity: 3 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 100,
            last_activity: 'Last activity: 1 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 67,
            last_activity: 'Last activity: 6 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 40,
            last_activity: 'Last activity: 6 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 90,
            last_activity: 'Last activity: 7 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 23,
            last_activity: 'Last activity: 1 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 0,
            last_activity: 'Last activity: 4 hour ago',
        },
        {
            mac_str: mock_macandress(),
            battery_percent: 80,
            last_activity: 'Last activity: 2 hour ago',
        },
    ]);

    const [modalOpen, setModalOpen] = useState(false);
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
                    {count.map((item) => {
                        return <DeviceCard {...item} />;
                    })}
                </div>
            </div>
        </div>
    );
}

const DeviceCard = ({ mac_str, battery_percent, last_activity }) => {
    const MIN_BATTERY_WIDTH = 0;
    const MAX_BATTERY_WIDTH = 64;

    const batteryWidth = (battery_percent / 100) * MAX_BATTERY_WIDTH;

    return (
        <div className={styles.deviceBox}>
            <img src={Device} alt="Device image" width={40} />

            <div className={styles.status}>
                <div className={styles.model}>
                    <h3>{mac_str}</h3>
                    <h4 className={styles.lastActivity}>{last_activity}</h4>
                </div>
                <div className={styles.batteryBox}>
                    <h3 className={styles.gradient}>{battery_percent}%</h3>
                    <div
                        className={styles.bar}
                        style={{ width: `${battery_percent}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
