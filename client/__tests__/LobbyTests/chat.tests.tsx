
import React from 'react';
import { render } from '../../__mocks__/test-utils';
import {within } from "@testing-library/react";;
import { Chat } from '@/components/Chat/chat';
import { chatProps } from '__mocks__/mockedData';

  
test('Chat renders received messages ', async () => {

    const { findByTestId } = render(<Chat {...chatProps} />);
    const messageSection = await findByTestId('message-section');
    expect(await within(messageSection).findByText(chatProps.chatMessages[0].message)).toBeTruthy();
    expect(await within(messageSection).findByText(chatProps.chatMessages[1].message)).toBeTruthy();
});
