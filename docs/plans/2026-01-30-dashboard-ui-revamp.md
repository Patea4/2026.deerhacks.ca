# Dashboard UI Revamp Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Revamp the DeerHacks dashboard with starry background, Apple-style glass-morphism tiles, remove gallery, integrate calendar with backend API, and update sponsors.

**Architecture:** Keep the existing MUI Grid tile layout but enhance all tiles with glass-morphism styling, add the Starfield canvas background, and create Apple-style visual refinements. Connect the frontend calendar to the Go backend `/events` API instead of mock data.

**Tech Stack:** Next.js, React, MUI, Tailwind CSS, TypeScript, Go/Gin backend

---

## Task 1: Add Starfield Background to Dashboard Layout

**Files:**
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/pages/dashboard/index.tsx:28-40`

**Step 1: Import Starfield component**

Add import at top of file:
```tsx
import Starfield from '@/components/Celestial/Starfield'
```

**Step 2: Wrap dashboard content with Starfield**

Find the opening `<Fade>` component and add Starfield before `<Container>`:
```tsx
<Fade in timeout={1000}>
  <Box component="main" sx={{ position: 'relative', minHeight: '100vh' }}>
    <Starfield />
    <Container maxWidth="xl" sx={{ py: '2rem', position: 'relative', zIndex: 1 }}>
```

And close the Box after Container:
```tsx
    </Container>
  </Box>
</Fade>
```

**Step 3: Verify build passes**

Run: `cd /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca && npm run build`
Expected: Build succeeds without errors

**Step 4: Commit**

```bash
git add pages/dashboard/index.tsx
git commit -m "feat(dashboard): add starry background using Starfield component"
```

---

## Task 2: Create Apple-Style Glass Tile Theme

**Files:**
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/styles/theme.ts:80-120`

**Step 1: Update MuiCard component override**

Find the MuiCard section and replace with glass-morphism styling:
```tsx
MuiCard: {
  styleOverrides: {
    root: {
      height: '100%',
      background: 'rgba(30, 30, 35, 0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        border: '1px solid rgba(255, 255, 255, 0.15)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
},
```

**Step 2: Update MuiCardContent for consistent padding**

```tsx
MuiCardContent: {
  styleOverrides: {
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.5rem',
      '&:last-child': {
        paddingBottom: '1.5rem',
      },
    },
  },
},
```

**Step 3: Add subtle glow to primary-colored elements**

Update the palette primary with a glow effect helper:
```tsx
primary: {
  main: '#90caf9',
  light: '#b3e5fc',
  dark: '#5d99c6',
},
```

**Step 4: Verify build passes**

Run: `cd /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca && npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add styles/theme.ts
git commit -m "feat(theme): add Apple-style glass-morphism to MuiCard components"
```

---

## Task 3: Update Dashboard Background Color

**Files:**
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/styles/theme.ts:30-40`

**Step 1: Change background colors to match celestial theme**

Find the palette background section and update:
```tsx
background: {
  default: 'hsl(222, 47%, 5%)',
  paper: 'hsl(222, 40%, 8%)',
},
```

**Step 2: Verify build passes**

Run: `cd /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add styles/theme.ts
git commit -m "feat(theme): update background colors to deep space blue"
```

---

## Task 4: Remove Gallery Page and Links

**Files:**
- Delete: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/pages/gallery/index.tsx`
- Delete: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/components/Dashboard/TileGallery/index.tsx`
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/components/Celestial/CelestialNavbar.tsx:11-15`
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/pages/dashboard/index.tsx` (remove TileGallery import if present)

**Step 1: Delete the gallery page file**

```bash
rm /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca/pages/gallery/index.tsx
```

**Step 2: Delete the TileGallery component**

```bash
rm /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca/components/Dashboard/TileGallery/index.tsx
```

**Step 3: Remove Gallery from CelestialNavbar**

In `CelestialNavbar.tsx`, update the navLinks array:
```tsx
const navLinks = [
  { label: 'Schedule', href: '/schedule' },
  { label: 'Code of Conduct', href: '/code' },
]
```

**Step 4: Remove any TileGallery references from dashboard**

Check `pages/dashboard/index.tsx` for any TileGallery import or usage (currently commented out) and remove entirely.

**Step 5: Verify build passes**

Run: `cd /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca && npm run build`
Expected: Build succeeds without gallery-related errors

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: remove gallery page and navigation links"
```

---

## Task 5: Update Sponsors Data

**Files:**
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/components/Celestial/SponsorsSection.tsx:10-35`

**Step 1: Update sponsors object with real sponsor data**

Replace the sponsors object:
```tsx
const sponsors = {
  platinum: [
    { name: 'Uber', placeholder: false },
    { name: 'University of Toronto', placeholder: false },
  ],
  gold: [
    { name: 'iCube UTM', placeholder: false },
    { name: 'Major League Hacking', placeholder: false },
    { name: 'AWS', placeholder: false },
  ],
  silver: [
    { name: 'echo3D', placeholder: false },
    { name: 'BIGDataAIHub @ IMI', placeholder: false },
    { name: 'StandOut Stickers', placeholder: false },
    { name: 'Silver Spoon', placeholder: false },
    { name: 'Thirstea', placeholder: false },
  ],
}
```

**Step 2: Verify build passes**

Run: `cd /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/Celestial/SponsorsSection.tsx
git commit -m "feat(sponsors): update sponsor list with 2026 sponsors"
```

---

## Task 6: Connect Calendar to Backend API

**Files:**
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/hooks/Event/useEventList.ts:10-12`
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/api/useFetch.ts` (if DH_BE endpoint needs updating)

**Step 1: Update useEventList to use real API**

Change from mock to real endpoint:
```tsx
export const useEventList = (props?: Props) => {
  return useAPI().useQuery(['eventList', null], {
    enabled: props?.enabled,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (resp) => {
      resp.parsedData = parseEvents(resp.data)
      props?.onSuccess?.()
    },
    onError: props?.onError,
  })
}
```

**Step 2: Add events endpoint to api/schema.ts for DH_BE**

In `/api/schema.ts`, add a new endpoint in the events function that calls the backend:
```tsx
const events = (customFetch: CustomFetch) =>
  ({
    eventList: async () => {
      const res = await customFetch(
        'GET',
        'DH_BE',
        '/events?pagination[page]=1&pagination[pageSize]=100&sort[0]=StartTime&sort[1]=Important:desc&sort[2]=EndTime:desc&sort[3]=Title'
      )
      return res.data as EventListResp
    },
  } as const)
```

**Step 3: Verify the frontend Event type matches backend RespEvent**

The backend returns `RespEvent` with:
- `id: int64`
- `attributes.title, description, location, createdAt, updatedAt, publishedAt, startTime, endTime, important, host, presenter, type`

Ensure `/types/Event.ts` matches this structure (it should based on existing mock data format).

**Step 4: Verify build passes**

Run: `cd /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca && npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add hooks/Event/useEventList.ts api/schema.ts
git commit -m "feat(calendar): connect schedule to backend /events API"
```

---

## Task 7: Style Individual Tile Components with Glass Effect

**Files:**
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/components/Dashboard/TileSchedule/index.tsx:60-70`
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/components/Dashboard/TileStatus/index.tsx:15-17`
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/components/Dashboard/TileRegistration/index.tsx`
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/components/Dashboard/TileUser/index.tsx`

**Step 1: Update TileSchedule special gradient**

In TileSchedule, update the Card sx prop for the active state:
```tsx
sx={{
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: hasEvents
    ? 'radial-gradient(circle at 70% 30%, rgba(144, 202, 249, 0.15), transparent 50%), rgba(30, 30, 35, 0.7)'
    : undefined,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
}}
```

**Step 2: Update TileStatus with accent glow**

Add subtle glow based on status type:
```tsx
<Card
  variant="outlined"
  sx={{
    background: 'rgba(30, 30, 35, 0.6)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  }}
>
```

**Step 3: Review and update TileRegistration**

Ensure consistent glass-morphism styling by removing any conflicting background styles.

**Step 4: Review and update TileUser**

Apply consistent styling to the user profile tile.

**Step 5: Verify build passes**

Run: `cd /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca && npm run build`
Expected: Build succeeds

**Step 6: Commit**

```bash
git add components/Dashboard/TileSchedule/index.tsx components/Dashboard/TileStatus/index.tsx components/Dashboard/TileRegistration/index.tsx components/Dashboard/TileUser/index.tsx
git commit -m "feat(tiles): apply consistent glass-morphism styling to dashboard tiles"
```

---

## Task 8: Add Apple-Style Typography Refinements

**Files:**
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/styles/theme.ts:50-75`

**Step 1: Update typography with SF Pro-inspired settings**

```tsx
typography: {
  fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontSize: '2rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    '@media (min-width:900px)': {
      fontSize: '2.5rem',
    },
  },
  h2: {
    fontSize: '1.25rem',
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: '-0.005em',
  },
  body1: {
    fontSize: '0.9375rem',
    lineHeight: 1.6,
    letterSpacing: '0.01em',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  button: {
    fontWeight: 500,
    textTransform: 'none' as const,
    letterSpacing: '0.02em',
  },
},
```

**Step 2: Verify build passes**

Run: `cd /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add styles/theme.ts
git commit -m "feat(typography): add Apple-style letter-spacing and font refinements"
```

---

## Task 9: Update Registration Form Styling

**Files:**
- Modify: `/Users/vorad/Desktop/deerhacks 2026/2026.deerhacks.ca/components/Dashboard/RegistrationForms/FormWrapper/index.tsx` (if exists)
- Or create shared styles in the registration form components

**Step 1: Find the form wrapper component**

Check if there's a FormWrapper or shared container for registration forms.

**Step 2: Apply glass-morphism to form containers**

Add consistent styling:
```tsx
sx={{
  background: 'rgba(30, 30, 35, 0.5)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  padding: '2rem',
}}
```

**Step 3: Update form input styling via MuiTextField override in theme**

Add to theme.ts components:
```tsx
MuiTextField: {
  styleOverrides: {
    root: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
        '&.Mui-focused': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
  },
},
```

**Step 4: Verify build passes**

Run: `cd /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca && npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add styles/theme.ts components/Dashboard/RegistrationForms/
git commit -m "feat(forms): apply glass-morphism styling to registration forms"
```

---

## Task 10: Final Visual Polish and Testing

**Files:**
- Review all modified files

**Step 1: Run the development server**

```bash
cd /Users/vorad/Desktop/deerhacks\ 2026/2026.deerhacks.ca && npm run dev
```

**Step 2: Manually verify dashboard appearance**

Check:
- Starfield background renders correctly
- Tiles have glass-morphism effect
- Hover states work smoothly
- Gallery link is removed from navigation
- Sponsors section shows correct sponsors
- Typography looks clean and Apple-inspired

**Step 3: Test calendar integration**

Verify the schedule loads from the backend API (may need backend running).

**Step 4: Run production build**

```bash
npm run build
```
Expected: Build succeeds without warnings

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat(dashboard): complete UI revamp with Apple-style glass-morphism theme"
```

---

## Summary

This plan implements:

1. **Starfield background** - Reuses existing Starfield.tsx canvas component
2. **Apple-style glass tiles** - Glass-morphism with blur, subtle borders, hover effects
3. **Deep space colors** - Updated MUI theme background to match celestial theme
4. **Gallery removal** - Delete page, component, and navigation links
5. **Sponsors update** - Updated with 2026 sponsor list
6. **Calendar integration** - Connect useEventList to backend `/events` API
7. **Tile styling** - Consistent glass-morphism across all dashboard tiles
8. **Typography** - Apple-inspired letter-spacing and weights
9. **Form styling** - Glass-morphism for registration forms
10. **Final testing** - Visual verification and build check
