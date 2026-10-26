---
title: "CMake & Make"
tags: [concept]
---

# CMake

### Example file

```jsx
cmake_minimum_required(VERSION 3.10)
project(MyProject VERSION 1.0.0 LANGUAGES CXX)

# 1. Target: Shared Library
add_library(core_logic SHARED 
    src/core.cpp 
    src/utils.cpp
)

# 2. Include Directories
target_include_directories(core_logic PUBLIC 
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
    $<INSTALL_INTERFACE:include>
)

# 3. Compiler Features
target_compile_features(core_logic PUBLIC cxx_std_17)

# 4. Target: Executable
add_executable(app_node src/main.cpp)

# 5. Linking
target_link_libraries(app_node PRIVATE core_logic)

# 6. Installation
install(TARGETS core_logic app_node
    EXPORT MyProjectConfig
    LIBRARY DESTINATION lib
    RUNTIME DESTINATION bin
    ARCHIVE DESTINATION lib
)
```

**🏗️ Core Command Breakdown
`cmake_minimum_required()`**
• **Definition:** Sets the minimum required CMake version to ensure compatibility with specific features.
• **Example:** `cmake_minimum_required(VERSION 3.8)`

**`project()`**
• **Definition:** Sets the project name, version, and default languages (C, CXX).
• **Example:** `project(example_project)`

**`add_library()`**
• **Definition:** Creates a library target from source files.
• **Example:** `add_library(core_logic SHARED src/core.cpp)`

**`add_executable()`**
• **Definition:** Creates a binary executable that contains the `main()` entry point.
• **Example:** `add_executable(app_node src/main.cpp)`

**🔍 Key Architecture ConceptsConceptDescriptionExample / ResultSHARED** Built as a dynamic library (`.so` or `.dll`) loaded at runtime.`add_library(... SHARED ...)`**Target Name**The internal ID CMake uses to track dependencies.`core_logic`**Output File**The actual file written to the disk.`libcore_logic.so`**Linkage**Shared libraries hold logic; executables call that logic.`target_link_libraries`

**⚙️ Target Properties & Logic
`target_include_directories()`**
• **Purpose:** Tells the compiler where to find `.h` or `.hpp` files.
• **Scope:** `PUBLIC` means any target linking to this library also gets these headers.
• **Example:** `target_include_directories(core_logic PUBLIC include)`

**`target_compile_features()`**
• **Purpose:** Enforces C++ standards (11, 14, 17, 20).
• **Example:** `target_compile_features(core_logic PUBLIC cxx_std_17)`

**`target_link_libraries()`**
• **Purpose:** Connects the executable to the library symbols.
• **Example:** `target_link_libraries(app_node core_logic)`