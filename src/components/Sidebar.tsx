import { Menu } from '@arco-design/web-react';
import { Logout } from './Logout';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export const Sidebar = () => {

    return (
        <div>
            <Menu mode='horizontal' theme='dark' defaultSelectedKeys={['1']}>
                <MenuItem key='0' style={{ padding: 0, marginRight: 38 }} disabled>
                    <div
                        style={{
                            // width: 80,
                            // height: 30,
                            // background: 'var(--color-fill-3)',
                            cursor: 'text',
                        }}
                    >
                       HAPPY CHAT
                    </div>
                </MenuItem>
                <MenuItem key='1'>Home</MenuItem>
            </Menu>
        </div>
    )
}