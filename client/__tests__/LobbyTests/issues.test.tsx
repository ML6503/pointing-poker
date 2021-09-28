/**
 * @jest-environment jsdom
 */

import * as React from "react";
export * from '@testing-library/react';

import { fireEvent, within, waitForElementToBeRemoved } from "@testing-library/react";
import { render } from '../../__mocks__/test-utils';
import IssueList  from '../../components/Lobby/issueList';
import { mockIssuesProps } from "__mocks__/mockedData";


afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

describe('IssueList element test', () => {
    // jest.setTimeout(30000);


    it("should render IssueList", () => {
        
        render(<IssueList {  ...mockIssuesProps } />);
      });

      it("on create issue icon click user can see issue popup", async () => {
        
        const { getByTestId, findByTestId } = render(<IssueList {  ...mockIssuesProps } />);

        const createIssueIcon = getByTestId('create-issue-icon');        
        expect(createIssueIcon).toBeInTheDocument();
        fireEvent.click(createIssueIcon);
        const createIssuePopup = await findByTestId('create-issue-popup');
        expect(createIssuePopup).toBeVisible();       
      });

      it("by selecting issue and clicking delete icon user can delete issue", async () => {
        
        const { getByTestId, queryByText, getByText, getByRole } = render(<IssueList {  ...mockIssuesProps } />);

        const selectIssueInput = getByTestId('select-issue-input');
        expect(selectIssueInput).toBeInTheDocument();
        const selectInputBtn = within(selectIssueInput).getByRole('button');
        fireEvent.mouseDown(selectInputBtn);
        const listbox = within(getByRole('listbox'));
        fireEvent.click(listbox.getByText(mockIssuesProps.issues[1].issueName));
        
         // Close the select using Escape or Tab or clicking away
        fireEvent.keyDown(document.activeElement, {
            key: "Escape",
            code: "Escape"
          });
           // Wait for Menu to close
        await waitForElementToBeRemoved(getByText("None"));
        // Verify selections
        expect(selectIssueInput).toHaveTextContent(
            mockIssuesProps.issues[1].issueName
        );

        const deleteIssueIcon = getByTestId('delete-issue-icon');        
        expect(deleteIssueIcon).toBeInTheDocument();
        fireEvent.click(deleteIssueIcon);
        const currentIssue = queryByText(mockIssuesProps.issues[1].issueName);
        expect(currentIssue).toBeNull();       
      });

      it("by selecting issue and clicking edit icon user can edit issue", async () => {
        
        const { getByTestId, findByTestId, getByText, getByRole, findByText } = render(<IssueList {  ...mockIssuesProps } />);

        const selectIssueInput = getByTestId('select-issue-input');
        const selectInputBtn = within(selectIssueInput).getByRole('button');
        fireEvent.mouseDown(selectInputBtn);
        const listbox = within(getByRole('listbox'));
        fireEvent.click(listbox.getByText(mockIssuesProps.issues[1].issueName));
        
         // Close the select using Escape or Tab or clicking away
        fireEvent.keyDown(document.activeElement, {
            key: "Escape",
            code: "Escape"
          });
           // Wait for Menu to close
        await waitForElementToBeRemoved(getByText("None"));
        // Verify selections
        expect(selectIssueInput).toHaveTextContent(
            mockIssuesProps.issues[1].issueName
        );

        const editIssueIcon = await findByTestId('edit-issue-icon');        
        expect(editIssueIcon).toBeInTheDocument();
        fireEvent.click(editIssueIcon);
        const editIssuePopup = await findByText('Change Issue');
        expect(editIssuePopup).toBeInTheDocument();
        const editIssueNameInput = await findByTestId('change-issue-name-input') as HTMLInputElement;
        fireEvent.change(editIssueNameInput, { target: { value: '42' } } );
        expect(editIssueNameInput).toHaveValue('42');
        expect(editIssueNameInput).not.toHaveValue(mockIssuesProps.issues[1].issueName);

        // find priority input and simulate choose another option        
        const selectIssuePriorityInput = await findByTestId('select-issue-priority-input');
        const selectOptions = selectIssuePriorityInput.childNodes[0].childNodes[0];    
        fireEvent.change(selectOptions, { target: { value: 'Middle' } }); 
        expect(selectOptions).toHaveValue('Middle');
        expect(selectOptions).not.toHaveValue(mockIssuesProps.issues[1].priority);
        // save changes  
        const saveBtn = getByText("Save");
        fireEvent.click(saveBtn);
        expect(editIssueIcon).not.toBeInTheDocument();
       
      });
});
