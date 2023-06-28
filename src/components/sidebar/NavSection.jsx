import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const NavSection = () => {
    return (
        <Box>
            <Menu>
                <MenuItem component={<Link to="/" />} > Dashboard </MenuItem>
                <SubMenu label="Inventory">
                    <MenuItem component={<Link to="/brand" />} > Brand </MenuItem>
                    <MenuItem component={<Link to="/category" />} > Category </MenuItem>
                    <MenuItem component={<Link to="/group" />} > Group </MenuItem>
                </SubMenu>
                <SubMenu label="Product">
                    <MenuItem component={<Link to="/product/create" />} > Add product </MenuItem>
                    <MenuItem component={<Link to="/product/list" />} > Product list </MenuItem>
                </SubMenu>
            </Menu>
        </Box>
    );
}
export default NavSection;