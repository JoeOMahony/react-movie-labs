import CircularProgress from '@mui/material/CircularProgress';

export default function CircularIndeterminate() {
    /* component to display a spinner when the app is waiting for data from TMDB. */
  return (
    <div sx={{
        display: 'flex',
        justifyContent: "center",
        '& > * + *': {
          marginLeft: '2em',
        }}}>
      <CircularProgress />
      <CircularProgress />
    </div>
  );
}
