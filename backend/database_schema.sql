-- =====================================================
-- FITNESS APPLICATION DATABASE SCHEMA
-- Optimized and Normalized Structure
-- =====================================================

-- Drop existing tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS memberships;
DROP TABLE IF EXISTS users;

-- =====================================================
-- CORE TABLES
-- =====================================================

-- 1. USERS TABLE (Enhanced)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('member', 'tDROP TABLE IF EXISTS feedback;
rainer', 'admin') DEFAULT 'member',
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    emergency_contact VARCHAR(100),
    profile_image VARCHAR(255),
    address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_active (is_active)
);

-- 2. MEMBERSHIPS TABLE (Enhanced)
CREATE TABLE memberships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category ENUM('individual', 'group', 'family', 'premium') NOT NULL,
    duration_months INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    features JSON NOT NULL COMMENT 'Array of features: ["Gym Access", "Group Classes", "Personal Training"]',
    max_classes_per_month INT DEFAULT 0,
    includes_personal_training BOOLEAN DEFAULT FALSE,
    is_highlighted BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_memberships_category (category),
    INDEX idx_memberships_active (is_active)
);

-- 3. TRAINERS TABLE (Enhanced)
CREATE TABLE trainers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    specializations JSON COMMENT 'Array of specializations: ["Yoga", "HIIT", "Strength Training"]',
    certifications JSON COMMENT 'Array of certifications: ["RYT-500", "NASM-CPT"]',
    experience_years INT DEFAULT 0,
    hourly_rate DECIMAL(10,2),
    bio TEXT,
    availability JSON COMMENT 'Weekly schedule: {"monday": ["09:00-12:00", "14:00-18:00"]}',
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    hire_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_trainers_rating (rating),
    INDEX idx_trainers_active (is_active),
    INDEX idx_trainers_experience (experience_years)
);

-- 4. SUBSCRIPTIONS TABLE (Enhanced)
CREATE TABLE subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    membership_id INT NOT NULL,
    trainer_id INT NULL COMMENT 'Optional personal trainer assignment',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('active', 'expired', 'cancelled', 'suspended') DEFAULT 'active',
    payment_status ENUM('paid', 'pending', 'failed', 'refunded') DEFAULT 'pending',
    auto_renew BOOLEAN DEFAULT FALSE,
    total_amount DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'ETB',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (membership_id) REFERENCES memberships(id) ON DELETE RESTRICT,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_subscriptions_user_status (user_id, status),
    INDEX idx_subscriptions_dates (start_date, end_date),
    INDEX idx_subscriptions_trainer (trainer_id)
);

-- 5. PAYMENTS TABLE (Enhanced)
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    subscription_id INT NULL,
    trainer_id INT NULL COMMENT 'For personal training session payments',
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'ETB',
    payment_method ENUM('cash', 'card', 'bank_transfer', 'mobile_money') NOT NULL,
    payment_type ENUM('subscription', 'personal_training', 'class', 'equipment', 'other') NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    metadata JSON COMMENT 'Payment gateway specific data and additional info',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_payments_user_status (user_id, status),
    INDEX idx_payments_transaction (transaction_id),
    INDEX idx_payments_date (payment_date),
    INDEX idx_payments_type (payment_type)
);

-- 6. FEEDBACK TABLE (Enhanced)
CREATE TABLE feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    trainer_id INT NULL,
    subscription_id INT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(200),
    comment TEXT,
    feedback_type ENUM('trainer', 'facility', 'equipment', 'service', 'general') NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    status ENUM('pending', 'published', 'rejected') DEFAULT 'pending',
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_feedback_trainer_rating (trainer_id, rating),
    INDEX idx_feedback_type_status (feedback_type, status),
    INDEX idx_feedback_user (user_id)
);


-- =====================================================
-- TRIGGERS FOR MAINTAINING DATA INTEGRITY
-- =====================================================

-- Update trainer rating when feedback is added/updated
DELIMITER //
CREATE TRIGGER update_trainer_rating_after_feedback
AFTER INSERT ON feedback
FOR EACH ROW
BEGIN
    IF NEW.trainer_id IS NOT NULL THEN
        UPDATE trainers 
        SET 
            rating = (
                SELECT AVG(rating) 
                FROM feedback 
                WHERE trainer_id = NEW.trainer_id 
                AND status = 'published'
            ),
            total_reviews = (
                SELECT COUNT(*) 
                FROM feedback 
                WHERE trainer_id = NEW.trainer_id 
                AND status = 'published'
            )
        WHERE id = NEW.trainer_id;
    END IF;
END//
DELIMITER ;

-- Update subscription status based on end_date
DELIMITER //
CREATE TRIGGER update_subscription_status
BEFORE UPDATE ON subscriptions
FOR EACH ROW
BEGIN
    IF NEW.end_date < CURDATE() AND NEW.status = 'active' THEN
        SET NEW.status = 'expired';
    END IF;
END//
DELIMITER ;

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Insert sample users
INSERT INTO users (first_name, last_name, email, phone, password_hash, role, gender) VALUES
('John', 'Doe', 'john.doe@example.com', '+251911123456', '$2b$10$hashedpassword1', 'member', 'male'),
('Jane', 'Smith', 'jane.smith@example.com', '+251911123457', '$2b$10$hashedpassword2', 'member', 'female'),
('Sarah', 'Johnson', 'sarah.johnson@example.com', '+251911123458', '$2b$10$hashedpassword3', 'trainer', 'female'),
('Mike', 'Wilson', 'mike.wilson@example.com', '+251911123459', '$2b$10$hashedpassword4', 'trainer', 'male'),
('Admin', 'User', 'admin@fitness.com', '+251911123460', '$2b$10$hashedpassword5', 'admin', 'other');

-- Insert sample memberships
-- Reset any existing membership rows and insert canonical pricingData-derived memberships
-- WARNING: TRUNCATE is destructive and will remove existing membership rows. Only run in development or with explicit approval in production.
TRUNCATE TABLE memberships;

INSERT INTO memberships (name, description, category, duration_months, price, features, max_classes_per_month, includes_personal_training) VALUES
('Daily', 'Daily pass — full gym access for one day', 'individual', 0, 700.00, '["Full gym access", "Clean shower & dressing room", "Secure parking", "Basic trainer guidance"]', 0, FALSE),
('1 Month', '1 Month membership — full access and guest coupons', 'individual', 1, 4000.00, '["Full gym access", "2 Free Guest Coupons", "Clean shower & dressing room", "Secure parking", "Basic trainer guidance"]', 0, FALSE),
('3 Month', '3 Month membership — discounted bundle', 'individual', 3, 10680.00, '["Full gym access", "5 Free Guest Coupons", "Clean shower & dressing room", "Secure parking", "Basic trainer guidance"]', 0, FALSE),
('6 Month', '6 Month membership — extended benefits and pass days', 'individual', 6, 20400.00, '["15 free pass days included", "10 Free Guest Coupons", "Full gym access", "Clean shower & dressing room", "Secure parking", "Basic trainer guidance"]', 0, FALSE),
('12 Month', '12 Month membership — best value annual plan', 'individual', 12, 38880.00, '["30 free pass days included", "10 Free Guest Coupons", "Full gym access", "Clean shower & dressing room", "Secure parking", "Basic trainer guidance"]', 0, FALSE),

('3 Month Group', '3 Month group package — shared benefits for groups', 'group', 3, 12000.00, '["Full gym access", "5 Free Guest Coupons", "Clean shower & dressing room", "Secure parking", "Group training sessions", "Community events"]', 0, FALSE),
('6 Month Group', '6 Month group package — extended group benefits', 'group', 6, 21360.00, '["10 Free Guest Coupons", "Full gym access", "Clean shower & dressing room", "Secure parking", "Group training sessions", "Community events", "Fitness challenges"]', 0, FALSE),
('12 Month Group', '12 Month group package — annual group plan with extras', 'group', 12, 40800.00, '["20 Free Guest Coupons", "Full gym access", "Clean shower & dressing room", "Secure parking", "Group training sessions", "Community events", "Fitness challenges", "Nutrition guidance"]', 0, FALSE),

('3 Month Family', '3 Month family package — access for family members', 'family', 3, 10300.00, '["5 Free Guest Coupons", "Full gym access", "Secure parking", "Basic trainer guidance", "Family activities"]', 0, FALSE),

('3 Month Personalized', '3 Month personalized package — one-on-one coaching included', 'personalized', 3, 18690.00, '["Personalized training program", "5 Free Guest Coupons", "One-on-one coaching", "Full gym access", "Clean shower & dressing room", "Secure parking", "Flexible class timing"]', 0, TRUE),
('6 Month Personalized', '6 Month personalized package — extended one-on-one program', 'personalized', 6, 35700.00, '["15 free pass days included", "10 Free Guest Coupons", "Flexible class timing", "Full gym access", "Clean shower & dressing room", "Secure parking"]', 0, TRUE),
('12 Month Personalized', '12 Month personalized package — premium long-term coaching', 'personalized', 12, 68040.00, '["0 free pass days included", "20 Free Guest Coupons", "Flexible class timing", "Full gym access", "Clean shower & dressing room", "Secure parking"]', 0, TRUE);

-- Insert sample trainers
INSERT INTO trainers (user_id, specializations, certifications, experience_years, hourly_rate, bio, availability, rating, total_reviews) VALUES
(3, '["Yoga", "Pilates", "Flexibility"]', '["RYT-500", "Pilates Certification", "First Aid"]', 5, 500.00, 'Certified yoga instructor with 5+ years of experience. Specializes in Hatha and Vinyasa yoga styles.', '{"monday": ["09:00-12:00", "14:00-18:00"], "wednesday": ["09:00-12:00", "14:00-18:00"], "friday": ["09:00-12:00", "14:00-18:00"]}', 4.8, 124),
(4, '["HIIT", "Cardio", "Weight Loss"]', '["NASM-CPT", "HIIT Specialist", "Nutrition Coach"]', 8, 600.00, 'High-intensity interval training specialist. Helps clients achieve rapid fitness results through structured programs.', '{"tuesday": ["08:00-12:00", "15:00-19:00"], "thursday": ["08:00-12:00", "15:00-19:00"], "saturday": ["08:00-14:00"]}', 4.9, 89);

-- Insert sample subscriptions
INSERT INTO subscriptions (user_id, membership_id, trainer_id, start_date, end_date, status, payment_status, total_amount) VALUES
(1, 2, NULL, '2025-01-01', '2025-02-01', 'active', 'paid', 4000.00),
(2, 3, 1, '2025-01-15', '2025-02-15', 'active', 'paid', 8000.00);

-- Insert sample payments
INSERT INTO payments (user_id, subscription_id, amount, payment_method, payment_type, transaction_id, status, description) VALUES
(1, 1, 4000.00, 'card', 'subscription', 'TXN001', 'completed', 'Premium Individual Membership - January 2025'),
(2, 2, 8000.00, 'bank_transfer', 'subscription', 'TXN002', 'completed', 'Personal Training Package - January 2025');


-- Insert sample feedback
INSERT INTO feedback (user_id, trainer_id, rating, title, comment, feedback_type, status) VALUES
(1, 1, 5, 'Excellent Trainer!', 'Sarah is an amazing yoga instructor. Very patient and knowledgeable.', 'trainer', 'published'),
(2, 2, 5, 'Great HIIT Sessions', 'Mike pushes you to your limits but in a safe and encouraging way.', 'trainer', 'published');

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- Active subscriptions with user and membership details
CREATE VIEW active_subscriptions AS
SELECT 
    s.id as subscription_id,
    CONCAT(u.first_name, ' ', u.last_name) as user_name,
    u.email,
    m.name as membership_name,
    s.start_date,
    s.end_date,
    s.status,
    s.total_amount,
    CONCAT(t.first_name, ' ', t.last_name) as trainer_name
FROM subscriptions s
JOIN users u ON s.user_id = u.id
JOIN memberships m ON s.membership_id = m.id
LEFT JOIN trainers tr ON s.trainer_id = tr.id
LEFT JOIN users t ON tr.user_id = t.id
WHERE s.status = 'active';

-- Trainer performance summary
CREATE VIEW trainer_performance AS
SELECT 
    tr.id as trainer_id,
    CONCAT(u.first_name, ' ', u.last_name) as trainer_name,
    tr.rating,
    tr.total_reviews,
    tr.experience_years,
    COUNT(DISTINCT s.id) as active_subscriptions,
    AVG(f.rating) as avg_feedback_rating
FROM trainers tr
JOIN users u ON tr.user_id = u.id
LEFT JOIN subscriptions s ON tr.id = s.trainer_id AND s.status = 'active'
LEFT JOIN feedback f ON tr.id = f.trainer_id AND f.status = 'published'
WHERE tr.is_active = TRUE
GROUP BY tr.id, u.first_name, u.last_name, tr.rating, tr.total_reviews, tr.experience_years;

-- Monthly revenue summary
CREATE VIEW monthly_revenue AS
SELECT 
    DATE_FORMAT(payment_date, '%Y-%m') as month,
    COUNT(*) as total_payments,
    SUM(amount) as total_revenue,
    AVG(amount) as avg_payment,
    COUNT(DISTINCT user_id) as unique_customers
FROM payments 
WHERE status = 'completed'
GROUP BY DATE_FORMAT(payment_date, '%Y-%m')
ORDER BY month DESC;

-- =====================================================
-- END OF SCHEMA
-- =====================================================
