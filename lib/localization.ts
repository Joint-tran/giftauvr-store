export type Locale = "en" | "ru";

export const translations = {
  en: {
    // Navigation
    home: "Home",
    marketplace: "Marketplace",
    buyCards: "Buy Cards",
    sellCards: "Sell Cards",
    myOrders: "My Orders",
    myWallet: "My Wallet",
    settings: "Settings",
    profile: "Profile",
    help: "Help & Support",
    signOut: "Sign Out",
    signIn: "Sign in to continue",

    // Sidebar
    toggleSidebar: "Toggle Sidebar",
    navigation: "Navigation",
    account: "Account",

    // Common
    language: "Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",

    // Wallet
    accountBalance: "Account Balance",
    depositInfo: "Deposit Information",
    amountDeposited: "Amount Deposited",
    transactionHash: "Transaction Hash",
    walletDetails: "USDT Wallet Details",
    walletAddress: "USDT Wallet Address",
    network: "Network",
    country: "Country",
    accountType: "Account Type",
    securityNote: "Only showing first and last 4 characters for security",
    notAvailable: "Not available",

    // Status
    approved: "Approved",
    rejected: "Rejected",
    pending: "Pending",

    // Admin
    admin: "Admin",
    dashboard: "Dashboard",
    users: "Users",
    approvals: "Approvals",
    wallet: "Wallet",
    withdrawals: "Withdrawals",
    manageUsers: "Manage Users",
    allUsers: "All Users",
    totalUsers: "Total",
    updateWallet: "Update Wallet",
    updateDepositInfo: "Update Deposit Information",
    selectUser: "Select User",
    chooseUser: "Choose user to update...",
    currentStatus: "Current Status",
    currentAmount: "Current Amount",
    depositAmount: "Deposit Amount (USDT)",
    enterAmount: "Enter USDT amount...",
    enterHash: "Enter transaction hash...",
    updateInfo: "Update Information",
    updating: "Updating...",

    // Approvals
    pendingApprovals: "Pending Approvals",
    approveUser: "Approve User",
    rejectUser: "Reject User",
    approveAccount: "Approve Account",
    rejectAccount: "Reject Account",
    confirmApprove: "Are you sure you want to approve",
    confirmReject: "Are you sure you want to reject",
    userAccount: "account",
    cancel: "Cancel",
    confirm: "Confirm",
    processing: "Processing...",
    approve: "Approve",
    reject: "Reject",

    // Users List
    name: "Name",
    email: "Email",
    balance: "Balance",
    deposit: "Deposit",
    status: "Status",
    createdAt: "Created",
    searchPlaceholder: "Search by email or name...",
    noUsers: "No users found",
    showing: "Showing",
    of: "of",

    // Messages
    fillAllFields: "Please fill all fields",
    updateSuccess: "Successfully updated deposit information",
    updateError: "Error updating information",
    approveSuccess: "User approved successfully and added 200 USDT to balance",
    rejectSuccess: "User rejected",
    cannotUpdate: "Cannot update",

    // Ban Wall
    banWallTitle: "Account Restricted",
    banWallSubtitle:
      "Your account has been suspended and cannot access features",
    banWallReason: "Reason:",
    banWallNoReason: "No specific information provided",
    banWallContactTitle: "Contact Support",
    banWallContactSignal: "Contact us on Signal",
    banWallContactSecure: "Secure & Private Messaging",
    banWallHowToContact: "How to contact us:",
    banWallStep1: "Install Signal app on your device",
    banWallStep2: "Scan the QR code above or use the contact information",
    banWallStep3: "Start a secure conversation with our support team",
    banWallStep4: "Describe your issue in detail",
    banWallMistake:
      "If you think this is a mistake, please contact admin immediately.",
    banWallAppeal: "You have 48 hours to appeal this decision.",
    banWallImportant: "Important:",
    banWallSecurity:
      "Only contact us through Signal for your security. We will never ask for your password or private keys.",
    banWallSignOut: "Sign Out",
    banWallSigningOut: "Signing out...",
  },
  ru: {
    // Navigation
    home: "Главная",
    marketplace: "Маркетплейс",
    buyCards: "Купить карты",
    sellCards: "Продать карты",
    myOrders: "Мои заказы",
    myWallet: "Мой кошелек",
    settings: "Настройки",
    profile: "Профиль",
    help: "Помощь и поддержка",
    signOut: "Выйти",
    signIn: "Войдите, чтобы продолжить",

    // Sidebar
    toggleSidebar: "Переключить боковую панель",
    navigation: "Навигация",
    account: "Аккаунт",

    // Common
    language: "Язык",
    darkMode: "Темный режим",
    lightMode: "Светлый режим",

    // Wallet
    accountBalance: "Баланс счета",
    depositInfo: "Информация о депозите",
    amountDeposited: "Сумма депозита",
    transactionHash: "Хеш транзакции",
    walletDetails: "Детали кошелька USDT",
    walletAddress: "Адрес кошелька USDT",
    network: "Сеть",
    country: "Страна",
    accountType: "Тип аккаунта",
    securityNote:
      "Для безопасности показаны только первые и последние 4 символа",
    notAvailable: "Недоступно",

    // Status
    approved: "Одобрено",
    rejected: "Отклонено",
    pending: "В ожидании",

    // Admin
    admin: "Админ",
    dashboard: "Панель управления",
    users: "Пользователи",
    approvals: "Одобрения",
    wallet: "Кошелек",
    withdrawals: "Выводы",
    manageUsers: "Управление пользователями",
    allUsers: "Все пользователи",
    totalUsers: "Всего",
    updateWallet: "Обновить кошелек",
    updateDepositInfo: "Обновить информацию о депозите",
    selectUser: "Выбрать пользователя",
    chooseUser: "Выберите пользователя для обновления...",
    currentStatus: "Текущий статус",
    currentAmount: "Текущая сумма",
    depositAmount: "Сумма депозита (USDT)",
    enterAmount: "Введите сумму USDT...",
    enterHash: "Введите хеш транзакции...",
    updateInfo: "Обновить информацию",
    updating: "Обновление...",

    // Approvals
    pendingApprovals: "Ожидающие одобрения",
    approveUser: "Одобрить пользователя",
    rejectUser: "Отклонить пользователя",
    approveAccount: "Одобрить аккаунт",
    rejectAccount: "Отклонить аккаунт",
    confirmApprove: "Вы уверены, что хотите одобрить",
    confirmReject: "Вы уверены, что хотите отклонить",
    userAccount: "аккаунт",
    cancel: "Отмена",
    confirm: "Подтвердить",
    processing: "Обработка...",
    approve: "Одобрить",
    reject: "Отклонить",

    // Users List
    name: "Имя",
    email: "Email",
    balance: "Баланс",
    deposit: "Депозит",
    status: "Статус",
    createdAt: "Создан",
    searchPlaceholder: "Поиск по email или имени...",
    noUsers: "Пользователи не найдены",
    showing: "Показано",
    of: "из",

    // Messages
    fillAllFields: "Пожалуйста, заполните все поля",
    updateSuccess: "Информация о депозите успешно обновлена",
    updateError: "Ошибка обновления информации",
    approveSuccess: "Пользователь одобрен и 200 USDT добавлено на баланс",
    rejectSuccess: "Пользователь отклонен",
    cannotUpdate: "Невозможно обновить",

    // Ban Wall
    banWallTitle: "Аккаунт ограничен",
    banWallSubtitle:
      "Ваш аккаунт был заблокирован и не может получить доступ к функциям",
    banWallReason: "Причина:",
    banWallNoReason: "Конкретная информация не предоставлена",
    banWallContactTitle: "Связаться с поддержкой",
    banWallContactSignal: "Свяжитесь с нами в Signal",
    banWallContactSecure: "Безопасный и приватный обмен сообщениями",
    banWallHowToContact: "Как связаться с нами:",
    banWallStep1: "Установите приложение Signal на ваше устройство",
    banWallStep2:
      "Отсканируйте QR-код выше или используйте контактную информацию",
    banWallStep3: "Начните безопасный разговор с нашей службой поддержки",
    banWallStep4: "Опишите вашу проблему подробно",
    banWallMistake:
      "Если вы считаете, что это ошибка, немедленно свяжитесь с администратором.",
    banWallAppeal: "У вас есть 48 часов, чтобы обжаловать это решение.",
    banWallImportant: "Важно:",
    banWallSecurity:
      "Связывайтесь с нами только через Signal для вашей безопасности. Мы никогда не будем спрашивать ваш пароль или приватные ключи.",
    banWallSignOut: "Выйти",
    banWallSigningOut: "Выход...",
  },
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}
