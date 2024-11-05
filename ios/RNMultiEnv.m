//  ==========================================

//  Welcome to the RNMultiEnv Module!
//  environments (dev, staging, prod) for

//  ==========================================

#import "RNMultiEnv.h"

@implementation RNMultiEnv

- (NSDictionary *)constantsToExport
{
#if DEV
  NSString *env = @"dev";
#elif STAGING
  NSString *env = @"staging";
#else
  NSString *env = @"prod";
#endif
  
  return @{ @"env": env};
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_EXPORT_MODULE(RNMultiEnv);

@end
