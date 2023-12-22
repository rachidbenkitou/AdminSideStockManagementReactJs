import { ScaleLoader } from 'react-spinners';

const LoaderComponent = () => {
  return (
    <div style={styles.loaderContainer}>
      <ScaleLoader color="#36d7b7" />
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
  },
};

export default LoaderComponent;
