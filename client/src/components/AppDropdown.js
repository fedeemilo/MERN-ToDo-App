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
        <DropdownItem className='mb-n1' style={{fontSize: '1rem'}} header>Categories</DropdownItem>
        
        {props.categs.map((currentCateg, i) =>{
          return (
            <DropdownItem>{currentCateg.categorie_name}</DropdownItem>
          )
        })}
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default AppDropdown;