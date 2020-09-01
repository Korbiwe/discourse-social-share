import { withPluginApi } from "discourse/lib/plugin-api";
export default {
  name: "extend-for-social-share-links",
  initialize() {
    withPluginApi("0.8.23", api => {
      // No settings, so we bail
      if (!settings.social_share_links.length) return;

      // split different links entered in the settings
      const socialShareLinks = settings.social_share_links.split("|");

      socialShareLinks
          .map((linkSection) => linkSection.split(','))
          .forEach(([id, icon, title, url]) => {
            api.addSharingSource({
              id,
              icon,
              title,
              generateUrl: (link, title) => {
                return (
                    url +
                    encodeURIComponent(link) +
                    "&title=" +
                    encodeURIComponent(title)
                );
              },
              showInPrivateContext: true,
              shouldOpenInPopup: true,
              popupHeight: 265
            });
          });
    });
  }
};
