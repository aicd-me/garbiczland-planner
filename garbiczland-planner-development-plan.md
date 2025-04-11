# Garbiczland Planner - Development Plan

## Current State Analysis
- Canvas-based drawing system
- Zone management (add, edit, delete zones with colors)
- Scenario management (but not properly connected to zones)
- Drawing and editing functionality
- Local storage for saving data

## Requirements Summary

1. **Configuration System**:
   - Load default zones and scenarios from a JSON config file
   - Include which scenarios each zone is active in by default
   - Default background image ("garbiczland.png")

2. **Zone-Scenario Relationship**:
   - Zones can be activated in specific scenarios
   - A zone's shape should be consistent across scenarios
   - Avoid redrawing the same zone for each scenario

3. **Drawing Functionality**:
   - Associate shapes with zones
   - Shapes automatically appear in all scenarios where the zone is active
   - Clear distinction between draw and edit modes

4. **UI Improvements**:
   - Better indication of active scenario
   - Clearer mode switching (draw vs. edit)
   - More intuitive zone-scenario relationship

## Proposed JSON Configuration Structure

```json
{
  "backgroundImage": "garbiczland.png",
  "zones": [
    {
      "id": "zone_1",
      "name": "Member 1 (Hellgelb)",
      "color": "#FFFFAA",
      "active": true,
      "activeInScenarios": ["festival", "member1"]
    },
    {
      "id": "zone_2",
      "name": "Backstage (Schwarz)",
      "color": "#000000",
      "active": true,
      "activeInScenarios": ["festival", "all_year", "other_events"]
    }
  ],
  "scenarios": [
    {
      "id": "festival",
      "name": "Festival",
      "description": "Main festival layout"
    },
    {
      "id": "all_year",
      "name": "All Year",
      "description": "Year-round access areas"
    }
  ]
}
```

## Data Structure Changes

The key changes to the data structure:

1. **Zone Items**:
   - Add `activeInScenarios` array to each zone
   - This defines which scenarios the zone appears in

2. **Shapes**:
   - Keep association with zone items
   - No direct association with scenarios (inherited from zone)

3. **Scenarios**:
   - Add `active` property to track the currently selected scenario
   - Remove the zone visibility tracking (now handled by zone's `activeInScenarios`)

## UI Improvements

1. **Scenario Selection**:
   - Add a prominent scenario selector in the header
   - Visually highlight the active scenario
   - Show only zones active in the current scenario (with option to show all)

2. **Mode Switching**:
   - Move the mode toggle to the header for better visibility
   - Add visual cues for the current mode (cursor changes, header color, etc.)
   - Add keyboard shortcuts for quick mode switching

3. **Zone-Scenario Visualization**:
   - Show which scenarios each zone is active in (tags or icons)
   - Allow toggling zone visibility in different scenarios
   - Filter the zone list based on the active scenario

## Implementation Plan

### Phase 1: Configuration System

1. Create a `config.json` file with the structure outlined above
2. Modify the initialization code to load from this file:
   - Update `initializeDefaultZoneItems()` to load from config
   - Update `initializeDefaultScenarios()` to load from config
   - Add code to load the default background image

### Phase 2: Data Structure Updates

1. Update the application state to include the new data structure:
   - Modify zone items to include `activeInScenarios`
   - Update scenario handling to track the active scenario
   - Modify shape handling to respect zone-scenario relationships

2. Update the rendering logic:
   - Modify `redrawCanvas()` to respect the active scenario
   - Update `renderZoneItems()` to show scenario associations
   - Update `renderScenarios()` to highlight the active scenario

### Phase 3: UI Improvements

1. Add a scenario selector to the header:
   - Create a dropdown or tab interface for scenario selection
   - Highlight the active scenario
   - Add event handlers for scenario switching

2. Improve mode switching:
   - Move the mode toggle to the header
   - Add visual cues for the current mode
   - Implement keyboard shortcuts

3. Enhance zone-scenario visualization:
   - Add UI elements to show which scenarios a zone is active in
   - Add controls to toggle zone visibility in different scenarios
   - Implement filtering of the zone list based on the active scenario

### Phase 4: Drawing Functionality Updates

1. Update the drawing system:
   - Modify `handleMouseDown()` to respect the active scenario
   - Update `completeCurrentShape()` to associate shapes with zones
   - Ensure shapes appear in all scenarios where their zone is active

2. Enhance the edit mode:
   - Improve visual feedback when editing shapes
   - Add validation to ensure proper zone-scenario relationships
   - Update help text to explain the new functionality

### Phase 5: Testing and Refinement

1. Test all functionality:
   - Configuration loading
   - Zone-scenario relationships
   - Drawing and editing
   - UI improvements

2. Refine based on testing:
   - Fix any bugs or issues
   - Improve performance if needed
   - Enhance UX based on feedback

## Timeline Estimate

- Phase 1 (Configuration System): 1-2 days
- Phase 2 (Data Structure Updates): 2-3 days
- Phase 3 (UI Improvements): 2-3 days
- Phase 4 (Drawing Functionality Updates): 2-3 days
- Phase 5 (Testing and Refinement): 1-2 days

Total estimated time: 8-13 days

## Key Challenges and Considerations

1. **Backward Compatibility**:
   - Ensure existing saved data can be migrated to the new format
   - Provide fallbacks for missing configuration

2. **Performance**:
   - Monitor canvas performance with complex shapes
   - Optimize rendering for multiple scenarios

3. **User Experience**:
   - Ensure the relationship between zones and scenarios is intuitive
   - Provide clear feedback during drawing and editing
   - Consider adding tooltips or a help system

4. **Future Extensibility**:
   - Design the system to allow for future features
   - Consider adding export/import functionality for sharing configurations