# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: 2.1 s
- **Render duration**: 363.3 ms
- **Screenshot**: ![A](./screenshots/A.png)

### Interaction B: Search countries

- **Commit duration**: 2 s
- **Render duration**: 99 ms
- **Screenshot**: ![B](./screenshots/B.png)

### Interaction C: Change year

- **Commit duration**: 2.8 s
- **Render duration**: 261.3 ms
- **Screenshot**: ![C](./screenshots/C.png)

### Interaction D: Toggle column

- **Commit duration**: 1.3 s
- **Render duration**: 239.8 ms
- **Screenshot**: ![D](./screenshots/D.png)


## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: 1.9 s
- **Render duration**: 22.5 ms
- **Screenshot**: ![A_1](./screenshots/D.png)

### Interaction B: Search countries

- **Commit duration**: 2.1 s
- **Render duration**: 12 ms
- **Screenshot**: ![B_1](./screenshots/D.png)

### Interaction C: Change year

- **Commit duration**: 1.8 s
- **Render duration**: 21.1 ms
- **Screenshot**: ![C_1](./screenshots/D.png)

### Interaction D: Toggle column

- **Commit duration**: 1.8 s
- **Render duration**: 15.7 ms
- **Screenshot**: ![D_1](./screenshots/D.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 363.3         | 22.5           | 93.8%       |
| Search countries | 99            | 12             | 87.9%       |
| Change year      | 261.3         | 21.1           | 91.9%       |
| Toggle column    | 239.8         | 15.7           | 93.5%       |
| **Average**      | **240.85**        | **17.83**          | **92.6%**       |