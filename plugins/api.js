import Auth from '@/api/auth';
import Banks from '@/api/banks';
import BankAccounts from '@/api/bankAccounts';
import Blacklists from '@/api/blacklists';
import Configs from '@/api/configs';
import Dashboard from '@/api/dashboard';
import PartnerReferences from '@/api/partnerReferences';
import Logs from '@/api/logs';
import SMSErrors from '@/api/sms/errors';
import SMSTopUps from '@/api/sms/topUps';
import SMSWithdraws from '@/api/sms/withdraws';
import Reports from '@/api/reports';
import TopUps from '@/api/topUps';
import Users from '@/api/users';
import Whitelists from '@/api/whitelists';
import Withdraws from '@/api/withdraws';

export default (context, inject) => {
    // Initialize API factories
    const factories = {
        auth: Auth(context.$axios),
        banks: Banks(context.$axios),
        bankAccounts: BankAccounts(context.$axios),
        blacklists: Blacklists(context.$axios),
        configs: Configs(context.$axios),
        dashboard: Dashboard(context.$axios),
        partnerReferences: PartnerReferences(context.$axios),
        logs: Logs(context.$axios),
        reports: Reports(context.$axios),
        smsErrors: SMSErrors(context.$axios),
        smsTopUps: SMSTopUps(context.$axios),
        smsWithdraws: SMSWithdraws(context.$axios),
        topUps: TopUps(context.$axios),
        users: Users(context.$axios),
        whitelists: Whitelists(context.$axios),
        withdraws: Withdraws(context.$axios),
    };

    // Inject $api
    inject('api', factories);
};
