import styles from './statistics.module.css';
import { Loader } from '../../components/Loader';
import {useUsersContext} from '../../context/usersContext'

function StatisticsPage() {
  const { loading, errorCount } = useUsersContext();
  if (loading) {
   return <Loader/>
  }
  return <div className={styles.pageRoot}>StatisticsPage</div>;
}

export default StatisticsPage;
