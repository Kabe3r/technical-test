import { createSlice } from "@reduxjs/toolkit";

export const NavHeroSlice =  createSlice({
      name: 'hero',
      initialState: {
            name: 'Current Projects',
            isCurrent: true,
            isAdd: false,
            isEdit: false,
            isArchived: false,
            isCompleted: false,
            isSidebar: false,
      },
      reducers: {
            handleNavigation: (state, action) => {
                  const checkName = action.payload;
                  state.name = checkName;
                  state.isCurrent = checkName === 'Current Projects';
                  state.isAdd = checkName === 'Add Project';
                  state.isEdit = checkName === 'Edit Project';
                  state.isArchived = checkName === 'Archived Projects';
                  state.isCompleted = checkName === 'Completed Projects';
                  state.isSidebar = !state.isSidebar;
            },
            handleToggle: (state) => {
                  state.isSidebar = !state.isSidebar;
            }
      }
});

export const { handleNavigation, handleToggle } = NavHeroSlice.actions;

export const selectSidebar = (state) => state.hero.isSidebar;

export default NavHeroSlice.reducer;