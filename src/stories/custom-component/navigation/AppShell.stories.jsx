import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { AppShell } from '../../../components/navigation/AppShell';

export default {
  title: 'Custom Component/Navigation/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## AppShell

범용 애플리케이션 쉘 컴포넌트.

### 특징
- GNB(헤더) + 메인 콘텐츠 영역 구성
- props로 로고와 메뉴 커스터마이징
- 투명/고정 헤더 옵션
        `,
      },
    },
  },
  argTypes: {
    logo: {
      control: 'text',
      description: '로고 텍스트',
    },
    menuItems: {
      control: 'object',
      description: '메뉴 항목 배열',
    },
    activeIndex: {
      control: { type: 'number', min: 0, max: 2 },
      description: '활성 메뉴 인덱스',
    },
    headerHeight: {
      control: { type: 'number', min: 48, max: 96 },
      description: '헤더 높이 (px)',
    },
    hasHeaderBorder: {
      control: 'boolean',
      description: '헤더 하단 보더',
    },
    isHeaderSticky: {
      control: 'boolean',
      description: '헤더 고정 여부',
    },
    isHeaderTransparent: {
      control: 'boolean',
      description: '헤더 투명 배경',
    },
    onMenuClick: {
      action: 'menuClicked',
      description: '메뉴 클릭 핸들러',
    },
  },
};

/** 기본 AppShell - Controls에서 Props 조작 가능 */
export const Default = {
  args: {
    logo: 'Logo',
    menuItems: ['Menu 1', 'Menu 2', 'Menu 3'],
    activeIndex: 0,
    headerHeight: 64,
    hasHeaderBorder: true,
    isHeaderSticky: true,
    isHeaderTransparent: false,
  },
  render: (args) => (
    <Box sx={{ height: 400, border: '1px solid', borderColor: 'divider' }}>
      <AppShell {...args}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.50',
          }}
        >
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Main Content
            </Typography>
            <Typography color="text.secondary">
              메뉴를 클릭하면 onMenuClick 핸들러가 호출됩니다.
            </Typography>
          </Box>
        </Box>
      </AppShell>
    </Box>
  ),
};

/** 메뉴 상태 관리 예시 */
export const WithActiveState = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const menuItems = ['Home', 'About', 'Contact'];

    return (
      <Box sx={{ height: 400, border: '1px solid', borderColor: 'divider' }}>
        <AppShell
          logo="MyBrand"
          menuItems={menuItems}
          activeIndex={activeIndex}
          onMenuClick={(item, index) => setActiveIndex(index)}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.50',
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              현재 페이지: {menuItems[activeIndex]}
            </Typography>
          </Box>
        </AppShell>
      </Box>
    );
  },
};

/** 레이아웃 변형 비교 */
export const LayoutVariants = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', mb: 1, display: 'block' }}>
          기본 레이아웃
        </Typography>
        <Box sx={{ height: 300, border: '1px solid', borderColor: 'divider' }}>
          <AppShell logo="Brand" menuItems={['Home', 'About', 'Contact']}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
              <Typography variant="h5" fontWeight={600}>Content Area</Typography>
            </Box>
          </AppShell>
        </Box>
      </Box>
      <Box>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', mb: 1, display: 'block' }}>
          투명 헤더 (Hero 섹션)
        </Typography>
        <Box sx={{ height: 300 }}>
          <AppShell
            logo="Brand"
            menuItems={['Home', 'About', 'Contact']}
            isHeaderTransparent
            hasHeaderBorder={false}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              }}
            >
              <Typography variant="h3" fontWeight={700} color="white">
                Hero Section
              </Typography>
            </Box>
          </AppShell>
        </Box>
      </Box>
    </Stack>
  ),
};
