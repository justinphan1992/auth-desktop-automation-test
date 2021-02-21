import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Status from '../../types';

interface TestCaseItemProps {
  status: Status;
  title: string;
  onClick: (e: React.MouseEvent) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
    boxShadow: theme.shadows[2],
    borderRadius: 5,
    minWidth: 600,
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
    cursor: 'pointer',
  },
  title: {
    color: '#67716b',
  },
  icon: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const TestCaseItem: React.FC<TestCaseItemProps> = ({
  title,
  status,
  onClick,
}: TestCaseItemProps) => {
  const classes = useStyles();

  const renderIcon = (): React.ReactNode | null => {
    switch (status) {
      case 'valid':
        return <CheckCircleIcon style={{ color: green[500] }} />;
      case 'invalid':
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <ListItem onClick={onClick} className={classes.root}>
      <ListItemText className={classes.title}>{title}</ListItemText>
      <ListItemIcon className={classes.icon}>{renderIcon()}</ListItemIcon>
    </ListItem>
  );
};

export default TestCaseItem;
