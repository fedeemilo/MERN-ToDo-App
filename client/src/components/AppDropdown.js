import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const AppDropdown = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className='ml-3' style={{margin: '0 auto'}}>
      <DropdownToggle caret>
           
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Categories</DropdownItem>
        <DropdownItem>Another Action</DropdownItem>

      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default AppDropdown;