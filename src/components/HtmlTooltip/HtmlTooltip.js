
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';


const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'rgb(255, 248, 216)',
    color: '#e38000',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #e38000',
  },
}))(Tooltip);


export default HtmlTooltip;
