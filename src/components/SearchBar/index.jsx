import { IconButton, TextField } from '@mui/material';
import classes from './index.module.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Searchbar = ({ handleSubmit, searchValue, setSearchValue }) => {
  return (
    <div className={classes.searchBar}>
      <TextField
        id="text-field"
        sx={{
          width: '90%',
          '& .MuiInputBase-root': {
            borderRadius: '25px',
            width: '100%',
            backgroundColor: 'white',
          },
        }}
        placeholder="Search for photos"
        variant="outlined"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        focused
        color="warning"
      />
      <IconButton
        sx={{
          width: '2em',
          height: '2em',
          backgroundColor: 'rgba(255,255,255,0.6)',
        }}
        onClick={() => handleSubmit(searchValue)}
      >
        <CameraAltIcon />
      </IconButton>
    </div>
  );
};

export default Searchbar;
