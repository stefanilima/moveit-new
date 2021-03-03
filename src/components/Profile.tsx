import styles from '../styles/components/Profile.module.css';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://stefanilima.com.br/wp-content/uploads/2021/02/ZVwoEsejShuftxAUt93mlw-1-scaled-e1612204683299-1024x1024.jpg" alt="Stefani Lima" />
            <div>
                <strong>Stefani Lima</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}