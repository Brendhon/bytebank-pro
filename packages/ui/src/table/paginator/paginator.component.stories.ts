import type { Meta, StoryObj } from '@storybook/angular';
import { PaginatorComponent } from './paginator.component';

const meta: Meta<PaginatorComponent> = {
  title: 'Components/Table/Paginator',
  component: PaginatorComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Paginator component for navigating through pages of content. Displays page numbers with ellipses for large page counts and navigation arrows.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'The current active page number'
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'The total number of available pages'
    },
    onPageChange: {
      action: 'pageChanged',
      description: 'Event emitted when the page changes'
    }
  }
};

export default meta;
type Story = StoryObj<PaginatorComponent>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10
  }
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5
  }
};

export const MiddlePage: Story = {
  args: {
    currentPage: 15,
    totalPages: 30
  }
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10
  }
};
